let tmp = require('tmp');
let path = require('path');
let fs = require('fs');
let spawn = require('child_process').spawn;
let webpack = require('webpack');

antlrJar = path.resolve(__dirname, 'antlr-4.9.3-complete.jar');

antlrArgs = ['-Dlanguage=JavaScript', '-visitor'];

module.exports.raw = true;
module.exports = function (grammar) {
  let callback = this.async();
  new Promise(resolve => {
    let grammarName = extractGrammarName(grammar) || this.emitError('Grammar is not named');
    createTempGrammarFile(grammarName, grammar, function (err, outputDir, grammarFile, cleanup) {
      if (err) {
        return resolve(err);
      }
      runAntlr(grammarFile, outputDir, function (err) {
        if (err) {
          return resolve(err);
        }
        compileAntlr(grammarName, outputDir, resolve);
      });
    });
  }).then(resp => {
    callback(null, resp);
    return resp;
  }).catch(callback)
};

function extractGrammarName(grammar) {
  var matches = /grammar\s+(\w+)\s*;/i.exec(grammar);
  return matches && matches[1];
}

function createTempGrammarFile(grammarName, grammarData, callback) {
  tmp.dir(function (err, tmpDir, cleanup) {
    if (err) {
      return callback(err);
    }
    var grammarFile = path.resolve(tmpDir, grammarName + '.g4');
    fs.writeFile(grammarFile, grammarData, function (err) {
      if (err) {
        return callback(err);
      }
      callback(null, tmpDir, grammarFile, function () {
        fs.unlink(grammarFile, () => {
          cleanup()
        });
      });
    });
  });
}

function runAntlr(grammarFile, outputDir, callback) {
  var antlr = spawn('java', ['-jar', antlrJar, '-o', outputDir, grammarFile].concat(antlrArgs), {
    stdio: ['ignore', process.stdout, process.stderr]
  });
  antlr.on('error', callback);
  antlr.on('exit', function (code, signal) {
    if (code) {
      return callback(new Error('ANTLR exited with code ' + code));
    }
    if (signal) {
      return callback(new Error('ANTLR exited with signal ' + signal));
    }
    callback(null);
  });
}

function compileAntlr(name, workingDir, callback) {
  console.log("will compile")
  fs.readdir(workingDir, function (err, files) {
    if (err) {
      callback(err);
    }
    var exports = files
      .filter(function (file) {
        return path.extname(file) === '.js';
      })
      .map(function (jsfile) {
        return path.basename(jsfile, '.js');
      })
      .map(function (name) {
        return `exports.${name} = require('./${name}.js').default`;
      })
      .join(',\n');
    var indexData = exports;
    var indexFile = path.resolve(workingDir, 'index.js');
    fs.writeFile(indexFile, indexData, function (err) {
      if (err) {
        return callback(err);
      }
      webpack({
        entry: indexFile,
        output: {
          path: path.resolve(workingDir),
          filename: 'bundle.js',
          libraryTarget: "umd"
        },
        externals: ["antlr4"],
        resolve: {
          fallback: {
            module: false, net: false, fs: false,
          }
        },
        mode: 'production',
        devtool: "source-map"

      }, function (err, stats) {
        console.log("compiled")

        if (err) {
          throw (err);
        }
        if (stats.hasErrors()) {
          throw (Error('Compilation of ANTLR resources failed: ' + stats.toString()));
        }

        fs.readFile(path.resolve(workingDir, 'bundle.js'), (err, data) => {
          if (err) {
            console.log("error reading file", err);
            return;
          }
          callback(data);
        });
      });
    });
  });
}

var connect  = require('connect');
var static = require('serve-static');

var server = connect();


server.use(  static(__dirname + '/dist'));

server.listen(3000);
console.log('Server running on port 3000');

var livereload = require('livereload');
var lrserver = livereload.createServer();
lrserver.watch(__dirname + "/dist");
lrserver.server.once("connection", () => {
  setTimeout(() => {
    lrserver.refresh("/");
  }, 100);
});

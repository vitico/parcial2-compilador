import antlr4, {ParserRuleContext} from 'antlr4';

import MyLexer from "./grammar/generated/SpreadsheetLexer"
import MyParser from "./grammar/generated/SpreadsheetParser"
// @ts-ignore
import print from "print-tree";
import SpreadsheetVisitor from "./grammar/SpreadsheetVisitor";
import {CalcTokensProvider} from "./CalcTokensProvider";
import * as monaco from "monaco-editor";
import {CancellationToken} from "monaco-editor";
import {getSemanticAnalisys, transformNodeToMermaidjsGraph} from "./utils";
import {CollectorErrorListener, Error} from "./grammar/ErrorListener";

let input = `
int a;
int b;
string c;
#bool d;
#string f=false;
d = true;
if (b == 4)
    a = a*a*a
endif
`
let prueba = false
if (prueba) {
  input += `
  c = "hola";
a = 3;
b = a + (b * a);
#c = a;
if (b == 4)
    a = a*a*a; 
endif
pruebaInvalid = "hola";
pruebaInvalid = c + a;
print a;
print b;`
}
// const chars = new antlr4.InputStream(input);
// const lexer = new MyLexer(chars);
// const tokens = new antlr4.CommonTokenStream(lexer);
// const parser = new MyParser(tokens);
// parser.buildParseTrees = true;
// parser.buildParseTre = true;
// parser.
// const tree = parser.program()
//
// function parse(val: any) {
//   return {
//     children: val.children?.map(parse) || [],
//     name: MyParser.ruleNames[val.ruleIndex] || MyParser.symbolicNames[val.symbol?.type],
//     symbol: val.symbol?.text
//   }
// }


// const visitor = new SpreadsheetVisitor();
// var finalTree = parse(tree);
// print(
//   finalTree,
//   (node: ReturnType<typeof parse>) => `[${node.name}]` + (node.symbol ? ":" + node.symbol : ""),
//   (node: ReturnType<typeof parse>) => node.children,
// );
// let result = visitor.visitProgram(tree)
// console.log("result", result);
// console.log("errors", visitor.errors);
// visitor.
// console.log(parse(tree));
self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  }
};

// var extractor = new JSListener()
// antlr4.tree.ParseTreeWalker.DEFAULT.walk(extractor, tree)[]
monaco.languages.register({
  id: 'calc',
})
monaco.languages.setLanguageConfiguration('calc', {
  comments: {
    lineComment: '#'
  },
  autoClosingPairs: [
    {open: '(', close: ')'},
    {open: '"', close: '"'},
    {open: "'", close: "'"},
    {open: "if", close: "endif"},
  ]
})
monaco.languages.setTokensProvider('calc', new CalcTokensProvider());
monaco.languages.registerDocumentSemanticTokensProvider("calc", {
  releaseDocumentSemanticTokens(resultId: string | undefined) {
    // console.log("releaseDocumentSemanticTokens", resultId);
  },
  provideDocumentSemanticTokens(model: monaco.editor.ITextModel, lastResultId: string | null, token: CancellationToken): monaco.languages.ProviderResult<monaco.languages.SemanticTokens | monaco.languages.SemanticTokensEdits> {
    // console.log("provideDocumentSemanticTokens", model, lastResultId, token);
    return new Promise(resolve => {
      const lines = model.getLinesContent();
      const errors: Error[] = [];
      let collector = new CollectorErrorListener(errors);
      const lexer = new MyLexer(new antlr4.InputStream(lines.join("\n")));
      lexer.removeErrorListeners();
      // lexer.addErrorListener(collector);
      const tokens = new antlr4.CommonTokenStream(lexer);
      const parser = new MyParser(tokens);
      parser.removeErrorListeners();
      parser.addErrorListener(collector);
      const tree = parser.program();
      const visitor = new SpreadsheetVisitor();
      visitor.visitProgram(tree);
      //TODO: add syntax errors

      // console.log("result", visitor.errors);
      const data: number[] = [];
      // translate the result into the format expected by the monaco-editor
      let curLine = 0;
      let curChar = 0;
      for (let i = 0; i < visitor.errors.length; i++) {
        const token = visitor.errors[i];
        // console.log("token", token);
        // add to data the translated token in the format expected by the monaco-editor that is:
        // [delta line, delta column, length, type index, modifier]
        let parsed = [
          Math.max(token.line - curLine, 0),
          curLine === token.line ? token.column - curChar : token.column,
          token.length + 1,
          0,
          0
        ];
        data.push(...parsed)
        // console.log("parsed", parsed);
        curLine = token.line;
        curChar = token.column;

      }

      // paser errors to monaco-editor format
      let parsed = visitor.errors.map(error => ({
        startLineNumber: error.line,
        startColumn: error.column + 1,
        endLineNumber: error.line,
        endColumn: error.column + error.length + 2,
        message: error.message,
        severity: monaco.MarkerSeverity.Error
      })).concat(errors.map(error => ({
        startLineNumber: error.startLine,
        startColumn: error.startCol + 1,
        endLineNumber: error.endLine,
        endColumn: error.endCol + 2,
        message: error.message,
        severity: monaco.MarkerSeverity.Error
      })));
      monaco.editor.setModelMarkers(model, "calc", parsed);
      // console.log("set markeds", parsed);
      resolve({
        data: [],
        resultId: null
      });
      // monaco.editor.mar

      // set model markeres here
      // model.

      // resolve({
      //   data,
      //   resultId: null,
      // });

    });
  },
  getLegend(): monaco.languages.SemanticTokensLegend {
    return {
      tokenTypes: [
        'error',
        'string',
        'keyword',
        'number',
        'regexp',
        'operator',
        'namespace',
        'type',
        'struct',
        'class',
        'interface',
        'enum',
        'typeParameter',
        'function',
        'member',
        'macro',
        'variable',
        'parameter',
        'property',
        'label'
      ],
      tokenModifiers: [
        'declaration',
        'documentation',
        'readonly',
        'static',
        'abstract',
        'deprecated',
        'modification',
        'async'
      ]

    }
  }

})
let literalFg = 'c97632';
let commentFg = '828282';
let idFg = '344482';
let symbolsFg = 'ff0000';
let stringFg = "658156"
let keywordFg = '7132a8';
let errorFg = 'ff0000';
let numbersFg = "4c75ba"
monaco.editor.defineTheme('myCoolTheme', {
  base: 'vs',
  inherit: true,
  colors: {},
  rules: [
    {token: 'integer.calc', foreground: numbersFg},
    {token: 'error.calc', foreground: numbersFg},
    {token: 'assign.calc', foreground: numbersFg},
    {token: 'identifier.calc', foreground: literalFg},
    {token: 'linecomment.calc', foreground: commentFg},
    {token: 'type.calc', foreground: literalFg},
    {token: 'string.calc', foreground: stringFg},
    {token: 'name.calc', foreground: idFg},
    {token: 'semicolon.calc', foreground: keywordFg},
    {token: 'op.calc', foreground: keywordFg},
    {token: 'assign.calc', foreground: keywordFg},
    {token: 'boolean.calc', foreground: keywordFg},
    {token: 'if.calc', foreground: keywordFg},
    {token: 'endif.calc', foreground: keywordFg},
    {token: 'print.calc', foreground: keywordFg},
    {token: 'id.calc', foreground: idFg, fontStyle: 'italic'},
    {token: 'lparen.calc', foreground: symbolsFg},
    {token: 'rparen.calc', foreground: symbolsFg},
    {token: 'equal.calc', foreground: symbolsFg},
    {token: 'minus.calc', foreground: symbolsFg},
    {token: 'plus.calc', foreground: symbolsFg},
    {token: 'div.calc', foreground: symbolsFg},
    {token: 'mul.calc', foreground: symbolsFg},
    {token: 'input_kw.calc', foreground: keywordFg, fontStyle: 'bold'},
    {token: 'output_kw.calc', foreground: keywordFg, fontStyle: 'bold'},
    {token: 'unrecognized.calc', foreground: errorFg},


  ]
});
// monaco.languages.

let editor = monaco.editor.create(document.getElementById('container'), {
  value: input,
  language: 'calc',
  theme: 'myCoolTheme',

  "semanticHighlighting.enabled": true
});

function doParse(input: string) {
  let code = input;
  let result = getSemanticAnalisys(code);
  //transform the result to mermaid syntax
  let mermaidGraph = transformNodeToMermaidjsGraph(result);
  mermaid.mermaidAPI.render('graphDiv', mermaidGraph, svg => {
    document.getElementById('result').innerHTML = svg;
    // store in a Blob
    const blob = new Blob([svg], { type: "image/svg+xml" });
    // create an URI pointing to that blob
    const url = URL.createObjectURL(blob);
    const win = open(url);
    // so the Garbage Collector can collect the blob
    win.onload = (evt) => URL.revokeObjectURL(url);
  });


}

$(document).ready(function () {
  $('#btn').click(function () {
    doParse(editor.getValue());
  });
  // doParse(input);
});

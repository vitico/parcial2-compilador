import antlr4, {ParserRuleContext} from 'antlr4';

import MyLexer from "./grammar/generated/SpreadsheetLexer"
import MyParser from "./grammar/generated/SpreadsheetParser"
// @ts-ignore
import print from "print-tree";
import SpreadsheetVisitor, {nodeToJavascriptCode} from "./grammar/SpreadsheetVisitor";
import {CalcTokensProvider} from "./CalcTokensProvider";
import * as monaco from "monaco-editor";
import {CancellationToken} from "monaco-editor";
import {getSemanticAnalisys, parseTreeStr, transformNodeToMermaidjsGraph} from "./utils";
import {CollectorErrorListener, Error} from "./grammar/ErrorListener";

let input = `
int a;
int b;
string c;
#bool d;
#string f=false;
d = true;
if (b == 4)
    a = a*a*a;
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
      return './scripts/json.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './scripts/css.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './scripts/html.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './scripts/ts.bundle.js';
    }
    return './scripts/editor.bundle.js';
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
        data: data,
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
let literalFg = '#c97632';
let commentFg = '#828282';
let idFg = '#344482';
let symbolsFg = '#ff0000';
let stringFg = "658156"
let keywordFg = '#7132a8';
let errorFg = '#ff0000';
let numbersFg = '#4c75ba'
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
let typesEditor = monaco.editor.create(document.getElementById('types-editor'), {
  language: 'json',
  theme: 'myCoolTheme',
  readOnly: true,
});
let astEditor = monaco.editor.create(document.getElementById('ast-editor'), {
  language: 'json',
  theme: 'myCoolTheme',
  readOnly: true,
});
let tokensEditor = monaco.editor.create(document.getElementById('tokens-editor'), {
  language: 'json',
  theme: 'myCoolTheme',
  readOnly: true,
})
let resultEditor = monaco.editor.create(document.getElementById('result-editor'), {
  language: 'javascript',
  theme: 'myCoolTheme',
  readOnly: true,
})


$(document).ready(function () {
  let idEmbedContainer = "ast-content"
  function createNewEmbed(src, callback = () => {
  }) {
    var embed = document.createElement('embed');
    embed.setAttribute('style', 'width: 500px; height: 500px; border:1px solid black;');
    embed.setAttribute('type', 'image/svg+xml');
    embed.setAttribute('src', src);
    document.getElementById(idEmbedContainer).appendChild(embed)

    function onLoad() {
      lastEmbed = svgPanZoom(embed, {
        zoomEnabled: true,
        controlIconsEnabled: true
      });
      callback();
      // embed.removeEventListener("load", onLoad)
    }

    embed.addEventListener('load', onLoad)

    return embed
  }

  let lastEmbed = null;

  function removeEmbed() {
    lastEmbed?.destroy()
    // Remove embed element
    document.getElementById(idEmbedContainer).innerHTML = '';
    // Null reference to embed
    lastEmbed = null
  }

  $('#btn').click(function () {
    doParse(editor.getValue());
  });

  function doParse(input: string) {
    let code = input;
    let tree = parseTreeStr(input);
    let [ast, types, tokens] = getSemanticAnalisys(code);
    tokens = tokens.map((token: { type: number, text: string }) => ({
      type: MyParser.symbolicNames[token.type],
      text: token.text,
    }));
    tokensEditor.setValue(JSON.stringify(tokens, replacer, 2));
    typesEditor.setValue(JSON.stringify(Array.from(types.entries()), replacer, 2));
    astEditor.setValue(JSON.stringify(ast, replacer, 2));

    function replacer(key, value) {
      if (value instanceof Map) {
        return {
          value: Array.from(value.entries()), // or with spread: value: [...value]
        };
      } else {
        return value;
      }
    }

    let resultCode = js_beautify(nodeToJavascriptCode(ast));
    resultEditor.setValue(resultCode);
// debugger;
    //transform the result to mermaid syntax
    let mermaidGraph = transformNodeToMermaidjsGraph(ast);
    let text = mermaid.mermaidAPI.render('nonexistant', mermaidGraph, svg => {
      removeEmbed();
      // store in a Blob
      const blob = new Blob([svg], {type: "image/svg+xml"});
      // // create an URI pointing to that blob
      const url = URL.createObjectURL(blob);

      createNewEmbed(url,()=>URL.revokeObjectURL(url));


    }, document.getElementById("graphDiv"));
    // get element with id "modal-ast" and remove class "d-none"
    $('#modal-ast').removeClass('d-none');
    codeGenerated = true;

  }
  let codeGenerated = false;
  $("#btn-ast-dialog-ok").on('click',()=>{
    $('#modal-ast').addClass('d-none');
  });
  $("#btn-ast").on('click',function(event){
    event.preventDefault();
    if(!codeGenerated) return;
    $('#modal-ast').removeClass('d-none');

  })
  // doParse(input);
});

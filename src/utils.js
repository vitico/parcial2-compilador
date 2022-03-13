import antlr4, {CommonTokenStream, InputStream, Parser, Token} from "antlr4";
import Lexer from "antlr4/src/antlr4/Lexer"
import SpreadsheetLexer from "./grammar/generated/SpreadsheetLexer";
import SpreadsheetParser from "./grammar/generated/SpreadsheetParser";
import {CalcErrorStrategy, CollectorErrorListener} from "./grammar/ErrorListener";
import SpreadsheetVisitor, {Node} from "./grammar/SpreadsheetVisitor";


export class MyErrorListener extends antlr4.error.ErrorListener {
  syntaxError(recognizer, offendingSymbol: Token, line: number, column: number, msg: string, e: any) {
    console.log("Error " + msg)
  }
}

export function createLexer(input: string) {
  const chars = new InputStream(input);
  let lexer: Lexer = new SpreadsheetLexer(chars);
  return lexer;
}

export function createParser(input) {
  const lexer = createLexer(input);
  return createParserFromLexer(lexer)
}

function createParserFromLexer(lexer) {
  const tokens = new CommonTokenStream(lexer);
  return new SpreadsheetParser(tokens);
}

function parseTree(input) {
  const parser = createParser(input);
  return parser.program();
}

export function parseTreeStr(input) {
  const lexer = createLexer(input);
  lexer.removeErrorListeners();
  lexer.addErrorListener(new MyErrorListener());

  const parser = createParserFromLexer(lexer);
  parser.removeErrorListeners();
  parser.addErrorListener(new MyErrorListener());

  const tree = parser.program();
  return tree.toStringTree(parser.ruleNames);
}

export function validate(input): Error[] {
  let errors: Error[] = []

  const lexer = createLexer(input);
  lexer.removeErrorListeners();
  let collector = new CollectorErrorListener(errors);
  lexer.addErrorListener(collector);

  const parser = createParserFromLexer(lexer);
  parser.removeErrorListeners();
  parser.addErrorListener(collector);
  parser._errHandler = new CalcErrorStrategy();

  const tree = parser.program();
  // console.log('errors',errors, collector.errors );
  return errors;
}

export function getSemanticAnalisys(input: string): Node {
  const lexer = createLexer(input);
  lexer.removeErrorListeners();
  lexer.addErrorListener(new MyErrorListener());
  const tokens = new CommonTokenStream(lexer)
  const parser = new SpreadsheetParser(tokens);
  parser.removeErrorListeners();
  parser.addErrorListener(new MyErrorListener());

  const tree = parser.program();
  const visitor = new SpreadsheetVisitor();
  let result = visitor.visit(tree);
  return [result,visitor.types,tokens.tokens];
}

function getConnector(comment: string = "") {
  if (comment)
    return " -- " + comment + " --> ";
  return "--->"
}

function nodeToGraph(node: Node | Node[] | string, preprend: string = "", addTo: string = "", comment = ""): string {
  let finalStr = "";
  if (typeof node == "string" || typeof node == "number" || typeof node == "boolean") {
    finalStr += addTo + getConnector(comment) + preprend + "[" + node + "]" + "\r\n";
    return finalStr;
  } else if (Array.isArray(node)) {
    node.forEach((n, index) => {
      finalStr += nodeToGraph(n, preprend + "_" + index, addTo, comment) + "\r\n";
    });
    return finalStr;
  } else if (node.type === "identifier"){
    finalStr += addTo + getConnector(comment) + preprend + "[" + node.children.get("name") + "]" + "\r\n";
    return finalStr;
  }
  else {
    finalStr += addTo + getConnector(comment) + preprend + "[" + node.type + "]" + "\r\n";
    // finalStr += nodeToGraph(node.left, preprend + "0", addTo + "0");
    // finalStr += nodeToGraph(node.right, preprend + "1", addTo + "1");
  }
  for (let key of node.children.keys()) {
    finalStr += nodeToGraph(node.children.get(key), preprend + "_" + key + "_", preprend, key);
  }
  return finalStr;
}

export function transformNodeToMermaidjsGraph(program: Node): string {
  let graph = "flowchart LR\n";
  // loop through the all nodes in the map
  for (let key of program.children.keys()) {

    let node: Node = program.children.get(key);
    graph += nodeToGraph(node, key, "program") + "\r\n";

  }
  // graph += nodeToGraph(program);
  // graph += `${node.toMermaidjsGraph()}\n`;
  // return a mock graph
  return graph;
  // return graph;
}

import BaseVisitor from "./generated/SpreadsheetVisitor";
import MyParser from "./generated/SpreadsheetParser";
import SpreadsheetParser from "./generated/SpreadsheetParser";


import antlr4, {Token, tree} from "antlr4";


function getText(symbol: tree.TerminalNodeImpl): string {

  return symbol.getText();
}

//define a class to define Errors in the input
//the error is defined by the line number, column number, length of context, and the error message
class Error {
  line: number;
  column: number;
  length: number;
  message: string;

  constructor(line: number, column: number, length: number, message: string) {
    this.line = line;
    this.column = column;
    this.length = length;
    this.message = message;
  }
}

// define a class for a tree node in the AST
// the node is defined by the type and value of the node, line number, column number, length, and a dictionary of children
export class Node {
  type: string;
  value: string;
  line: number;
  column: number;
  length: number;
  children: Map<string, Node | Node[] | string> = new Map<string, Node | Node[] | string>();

  constructor(type: string, value: string, line: number, column: number, length: number, children: Map<string, Node | Node[] | string>) {
    this.type = type;
    this.value = value;
    this.line = line;
    this.column = column;
    this.length = length;
    this.children = children || new Map<string, Node | Node[] | string>();
  }
}

export function nodeToJavascriptCode(node: Node) {
  let code = "";
  if (node.type === "value") {
    let type = node.children.get("type");
    let value = node.children.get("value");
    switch (type) {
      case "int":
      case "boolean":
      case "string":
        code += value;
        break;
      case "identifier":
        code += value;
        break;
    }
  } else if (node.type === "declaration") {
    code += "var " + node.value;
    if (node.children.has("assign")) {
      code += " = " + nodeToJavascriptCode(node.children.get("assign").children.get("value"));
    }
    code += ";\n";
  } else if (node.type === "assign") {
    code += node.value + " = " + nodeToJavascriptCode(node.children.get("value")) + ";\n";
  } else if (node.type === "identifier") {
    code += node.value;
  } else if (node.type === "function") {
    code += `${node.value}(${node.children.get("arguments").map(nodeToJavascriptCode).join(", ")})`;
  } else if (node.type === "operator") {
    code += nodeToJavascriptCode(node.children.get("left")) + " " + node.value + " " + nodeToJavascriptCode(node.children.get("right"));
    // code += `${node.value}(${node.children.get("operands").map(nodeToJavascriptCode).join(", ")})`;
  } else if (node.type === "if") {
    code += `if (${nodeToJavascriptCode(node.children.get("condition"))}) {\n`;
    code += node.children.get("statements").map(nodeToJavascriptCode).join("");
    code += "}\n";
  } else if (node.children && node.children.size > 0) {
    // loop all childrens
    for (let child of node.children.values()) {
      if (Array.isArray(child)) {
        for (let childNode of child) {
          code += nodeToJavascriptCode(childNode);
        }
      } else {
        code += nodeToJavascriptCode(child)
      }
    }
    // code += node.children.forEach(nodeToJavascriptCode);
  } else if (typeof node === "string") {
    code += node;
  } else if (Array.isArray(node)) {
    for (let child of node) {
      code += nodeToJavascriptCode(child);
    }

  }
  return code;
}

export default class SpreadsheetVisitor extends BaseVisitor {

  types = new Map<string, string>()
  parser: SpreadsheetParser
  errors: Error[] = []

  constructor(parser: SpreadsheetParser) {
    super();
  }

  visitProgram(ctx: InstanceType<MyParser["ProgramContext"]>) {
    this.types.clear();
    // if super.visitProgram(ctx) returns an array, return filtered array
    let result = super.visitProgram(ctx);
    let programNode = new Node("program", "", ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    if (result instanceof Array) {
      result
        .filter(Boolean)
        .filter(x => x instanceof Array).map(t => t[0])
        .forEach((node, index) => programNode.children.set(index, node));
      return programNode;
    }
    // otherwise debug and return result
    programNode.children.set("unknown", result);
    return programNode;
  }

  getExpressionType(ctx: InstanceType<SpreadsheetParser["ExpressionContext"]>): string {
    switch (true) {
      case ctx instanceof SpreadsheetParser.TermExprContext:
        return this.getTermExprType(ctx);
      case ctx instanceof SpreadsheetParser.OpExprContext:
        return this.getOpExprType(ctx);
      case ctx instanceof SpreadsheetParser.ParenExprContext:
        return this.getParenExprType(ctx);
    }
  }

  getParenExprType(ctx: InstanceType<SpreadsheetParser["ParenExprContext"]>) {
    return this.getExpressionType(ctx.expression()).trim()
  }

  getOpExprType(ctx: InstanceType<SpreadsheetParser["OpExprContext"]>) {
    let leftType = this.getExpressionType(ctx.expression(0));
    let rightType = this.getExpressionType(ctx.expression(1));
    let op = getText(ctx.OP(0)) //TODO: implement loop to get all operators
    // if types are not the same, log information with the error message indicating the type mismatch and the line numbes
    if (leftType !== rightType) {
      // this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
      //   `Type mismatch1: ${leftType} and ${rightType} for operator ${op}`));
    }
    // if the operator is a boolean operator or a comparator, return bool
    if (op === "==" || op === "!=" || op === ">" || op === "<" || op === ">=" || op === "<=") {
      return "bool"
    }
    return leftType
  }

  getTermExprType(ctx: InstanceType<SpreadsheetParser["TermExprContext"]>) {
    // return the type of the term
    return this.getTermType(ctx.term())
  }

  getTermType(ctx: InstanceType<SpreadsheetParser["TermContext"]>) {
    if (ctx.identifier()) {
      return this.getIdentifierType(ctx.identifier())
    } else if (ctx.INTEGER()) {
      return "int";
    } else if (ctx.STRING())
      return "string";
    else if (ctx.BOOLEAN()) {
      return "bool";
    } else {
      // throw error
      throw new Error("unexpected term type")
    }
  }

  getIdentifierType(ctx: InstanceType<typeof SpreadsheetParser["IdentifierContext"]>) {
    let name = getText(ctx);
    if (this.types.has(name)) {
      return this.types.get(name)
    } else {
      // this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
      //   `Undefined identifier: ${name}`));
      return "undefined"
    }
  }

  visitAssignstmt(ctx: InstanceType<typeof SpreadsheetParser["AssignstmtContext"]>): * {
    let text = getText(ctx)
    let name = getText(ctx.NAME());
    let valueType = this.getExpressionType(ctx.expression());
    // retunr assign, name, and the expression
    let node = new Node("assign", name, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    node.children.set("variable", name);
    node.children.set("value", this.visitExpr(ctx.expression()));

    if (this.types.has(name)) {
      if (this.types.get(name) !== valueType) {
        // if both types are not equal to "undefined", add the error
        if (valueType !== "undefined" && this.types.get(name) !== "undefined")
          this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
            `Type mismatch2: ${this.types.get(name)} and ${valueType}`));
      }
    } else {
      if (valueType === "undefined") {
        this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
          `cant assign ${valueType} to ${name}`));
        return node;
      }
      this.types.set(name, valueType)
      let declaration = new Node("declaration", name, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
      declaration.children.set("type", valueType);
      declaration.children.set("name", name);
      declaration.children.set("assign", node);
      console.log("assign", node);
      return declaration;
    }

    return node;
  }

  visitIfstmt(ctx: InstanceType<typeof SpreadsheetParser["IfstmtContext"]>): * {
    // get all statements
    let statements = ctx.statement();
    // get the condition
    let condition = ctx.expression();

    let node = new Node("if", "", ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    node.children.set("condition", this.visitExpr(condition));
    node.children.set("statements", statements.map(statement => this.visitStatement(statement)));
    return node;
  }

  visitExpr(ctx: InstanceType<typeof SpreadsheetParser["ExprContext"]>): * {
    // if ctx is instaceof OpExprContext, return this.VIsitOpExpr(ctx)
    // else if ctx is instanceof TermExprContext, return this.VisitTermExpr(ctx)
    // else if ctx is instanceof ParenExprContext, return this.VisitParenExpr(ctx)
    // else add error
    if (ctx instanceof SpreadsheetParser.OpExprContext) {
      return this.visitOpExpr(ctx)
    } else if (ctx instanceof SpreadsheetParser.TermExprContext) {
      return this.visitTermExpr(ctx)
    } else if (ctx instanceof SpreadsheetParser.ParenExprContext) {
      return this.visitParenExpr(ctx)
    } else {
      this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
        `Unexpected expression type`));
    }
  }

  visitOpExpr(ctx: InstanceType<typeof SpreadsheetParser["OpExprContext"]>): * {
    let leftExpr = ctx.expression(0);
    let rightExpr = ctx.expression(1);
    let left = this.visitExpr(leftExpr);
    let right = this.visitExpr(rightExpr);
    let op = getText(ctx.OP(0)); //TODO: implement loop to get all operators
    let leftType = this.getExpressionType(leftExpr);
    let rightType = this.getExpressionType(rightExpr);
    // if types are not the same, log information with the error message indicating the type mismatch and the line numbes
    if (leftType !== rightType) {
      if (leftType !== "undefined" && rightType !== "undefined") {
        this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
          `Type mismatch: ${leftType} and ${rightType} for operator ${op}`));
      }
    }

    // return op, left, right
    let node = new Node("operator", op, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    node.children.set("left", left);
    // node.children.set("op", op);
    node.children.set("right", right);
    return node;
    // if operands are of type int, perform the operation using switch
    // if (leftType === "int") {
    //   switch (op) {
    //     case "+":
    //       return left + right;
    //     case "-":
    //       return left - right;
    //     case "*":
    //       return left * right;
    //     case "/":
    //       return left / right;
    //     case "%":
    //       return left % right;
    //     default:
    //       this.errors.push(`Unexpected operator ${op} at line ${ctx.start.line}`)
    //       return null;
    //   }
    // }


  }


  visitTermExpr(ctx: InstanceType<typeof SpreadsheetParser["TermExprContext"]>): * {
    // return the result of visitTerm
    return this.visitTerm(ctx.term())
  }

  visitTerm(ctx: InstanceType<typeof SpreadsheetParser["TermContext"]>): * {
    let text = getText(ctx);
    if (ctx.identifier()) {
      return this.visitIdentifier(ctx.identifier())
    } else if (ctx.INTEGER()) {
      return new Node("value", text, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column, new Map<string, Node | Node[] | string>([
        ["value", text],
        ["type", "int"]
      ]));
    } else if (ctx.STRING()) {
      // get text from ctx.STRING() and return it without the quotes
      text = getText(ctx.STRING());
      return new Node("value", text.substring(1, text.length - 1), ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column, new Map<string, Node | Node[] | string>([
        ["value", text],
        ["type", "string"]
      ]));
    } else if (ctx.BOOLEAN()) {
      return new Node("value", text === "true", ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column, new Map<string, Node | Node[] | string>([
        ["value", text],
        ["type", "boolean"]
      ]));
    } else {
      this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
        `Unexpected term type`));
    }
    return text; //TODO: verify if this is correct
  }

  visitParenExpr(ctx: InstanceType<typeof SpreadsheetParser["ParenExprContext"]>): * {
    return this.visitExpr(ctx.expression())
  }


  visitDeclaration(ctx: InstanceType<typeof SpreadsheetParser["DeclarationContext"]>) {
    let text = getText(ctx);
    // if assign exists, get name from assign, else get name from context
    let name = ctx.assignstmt() ? getText(ctx.assignstmt().NAME()) : getText(ctx.NAME());
    let type = getText(ctx.TYPE());

    // if type is not in the types map, add it to the map
    if (!this.types.has(name)) {
      this.types.set(name, type);
    } else {
      // if type is already in the map, check if it is the same as the type in the map
      if (this.types.get(name) !== type) {
        this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column,
          `Type mismatch: ${this.types.get(name)} and ${type}`));
      }
    }

    // if assign exists, visit assignstmt and return the result
    let node = new Node("declaration", name, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    node.children.set("type", type);
    node.children.set("name", name);
    if (ctx.assignstmt()) {
      node.children.set("assign", this.visitAssignstmt(ctx.assignstmt()));
    }

    return node //TODO: verify if this is correct
    /*old code:
    // BaseVisitor.
    super.visitDeclaration(ctx);
    // console.log("dec", ctx);
    let name = ctx.NAME();
    let type = ctx.TYPE();
    let nameText = getText(name);
    if (!nameText) {
      console.log("desc", [getText(name), getText(type)])
      debugger;
    }
    return [
      getText(type),
      getText(name),
    ];*/
  }

  visitIdentifier(ctx: InstanceType<typeof SpreadsheetParser["IdentifierContext"]>): * {
    let name = getText(ctx.NAME());
    let type = this.types.get(name);
    if (!type) {
      this.errors.push(new Error(ctx.start.line, ctx.start.column, ctx.getText().length - 1,
        `Undeclared variable ${name}`));
      return null;
    }
    let node = new Node("identifier", name, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    node.children.set("type", type);
    node.children.set("name", name);
    return node;
  }

  visitStatement(ctx): * {
    // if LINECOMMENT exists, return null, else return super.visitStatement(ctx)
    if (ctx.LINECOMMENT()) {
      return null;
    }
    return super.visitStatement(ctx);

  }

  visitPrintstmt(ctx: InstanceType<typeof SpreadsheetParser["PrintstmtContext"]>): * {
    let term = this.visitTerm(ctx.term());
    let node = new Node("print", term, ctx.start.line, ctx.start.column, ctx.stop.column - ctx.start.column);
    return node;
  }
}

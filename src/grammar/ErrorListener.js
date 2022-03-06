import antlr4, {Parser, Token, error, ParserRuleContext} from "antlr4";
import SpreadsheetParser from "./generated/SpreadsheetParser";

export class Error {
  startLine: number;
  endLine: number;
  startCol: number;
  endCol: number;
  message: string;

  constructor(startLine: number, endLine: number, startCol: number, endCol: number, message: string) {
    this.startLine = startLine;
    this.endLine = endLine;
    this.startCol = startCol;
    this.endCol = endCol;
    this.message = message;
  }
}

export class CollectorErrorListener extends error.ErrorListener {
   errors: Error[] = []

  constructor(errors: Error[]) {
    super()
    this.errors = errors
  }

  syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
    var endColumn = column + 1;
    if (offendingSymbol?._text !== null) {
      endColumn = column + offendingSymbol?._text?.length;
    }
    this.errors.push(new Error(line, line, column, endColumn, msg));
  }
}

export class CalcErrorStrategy extends error.DefaultErrorStrategy {

  reportUnwantedToken(recognizer: Parser) {
    return super.reportUnwantedToken(recognizer);
  }

  singleTokenDeletion(recognizer: Parser) {
    var nextTokenType = recognizer.getTokenStream().LA(2);
    if (recognizer.getTokenStream().LA(1) == SpreadsheetParser.SEMICOLON) {
      return null;
    }
    var expecting = this.getExpectedTokens(recognizer);
    if (expecting.contains(nextTokenType)) {
      this.reportUnwantedToken(recognizer);
      // print("recoverFromMismatchedToken deleting "
      // + str(recognizer.getTokenStream().LT(1))
      // + " since " + str(recognizer.getTokenStream().LT(2))
      // + " is what we want", file=sys.stderr)
      recognizer.consume(); // simply delete extra token
      // we want to return the token we're actually matching
      var matchedSymbol = recognizer.getCurrentToken();
      this.reportMatch(recognizer); // we know current token is correct
      return matchedSymbol;
    } else {
      return null;
    }
  }
  getExpectedTokens = function(recognizer) {
    return recognizer.getExpectedTokens();
  };

  reportMatch = function(recognizer) {
    this.endErrorCondition(recognizer);
  };

}

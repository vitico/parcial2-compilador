//@flow
import type monaco from "monaco-editor/monaco";
import {createLexer, validate} from "./utils";
import SpreadsheetParser from "./grammar/generated/SpreadsheetParser";

type IState = monaco.languages.IState;
type TokensProvider = monaco.languages.TokensProvider;
type IToken = monaco.languages.IToken;
type ILineTokens = monaco.languages.ILineTokens;

export class CalcState implements IState {
  clone(): monaco.languages.IState {
    return new CalcState();
  }

  equals(other: monaco.languages.IState): boolean {
    return true;
  }

}


export class CalcTokensProvider implements TokensProvider {
  getInitialState(): IState {
    return new CalcState();
  }

  tokenize(line: string, state: IState): ILineTokens {
    // console.log("tokenize", line, state);
    return tokensForLine(line);
  }

}

const EOF = -1;

class CalcToken implements IToken {
  scopes: string;
  startIndex: number;

  constructor(ruleName: string, startIndex: number) {
    this.scopes = ruleName.toLowerCase() + ".calc";
    this.startIndex = startIndex;
  }
}

class CalcLineTokens implements ILineTokens {
  constructor(tokens: IToken[]) {
    this.endState = new CalcState();
    this.tokens = tokens;
  }

}

export function tokensForLine(input: string): ILineTokens {
  var errorStartingPoints: number[] = validate(input);

  const lexer = createLexer(input);
  lexer.removeErrorListeners();
  let done = false
  let myTokens: IToken[] = [];
  do {
    let token = lexer.nextToken();
    if (token == null) {
      done = true;
    } else {
      if (token.type == EOF) {
        done = true;
      } else {
        let tokenTypeName = SpreadsheetParser.symbolicNames[token.type];
        let myToken = new CalcToken(tokenTypeName, token.column);
        myTokens.push(myToken)
      }
    }
  } while (!done);

  for (let e of errorStartingPoints) {
    myTokens.push(new CalcToken("error.calc", e))
  }
  myTokens.sort((a, b) => a.startIndex > b.startIndex ? 1 : -1)
  return new CalcLineTokens(myTokens)
}

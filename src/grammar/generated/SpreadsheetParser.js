// Generated from ./src/grammar/Spreadsheet.g4 by ANTLR 4.9.3
// jshint ignore: start
import antlr4 from 'antlr4';
import SpreadsheetListener from './SpreadsheetListener.js';
import SpreadsheetVisitor from './SpreadsheetVisitor.js';


const serializedATN = ["\u0003\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786",
    "\u5964\u0003\u0011[\u0004\u0002\t\u0002\u0004\u0003\t\u0003\u0004\u0004",
    "\t\u0004\u0004\u0005\t\u0005\u0004\u0006\t\u0006\u0004\u0007\t\u0007",
    "\u0004\b\t\b\u0004\t\t\t\u0004\n\t\n\u0003\u0002\u0007\u0002\u0016\n",
    "\u0002\f\u0002\u000e\u0002\u0019\u000b\u0002\u0003\u0002\u0003\u0002",
    "\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0003\u0005\u0003",
    "\"\n\u0003\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004\u0003\u0004",
    "\u0005\u0004)\n\u0004\u0003\u0005\u0003\u0005\u0003\u0005\u0003\u0005",
    "\u0003\u0005\u0006\u00050\n\u0005\r\u0005\u000e\u00051\u0003\u0005\u0003",
    "\u0005\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0006\u0003\u0007\u0003",
    "\u0007\u0003\u0007\u0003\u0007\u0003\u0007\u0003\b\u0003\b\u0003\b\u0003",
    "\b\u0003\b\u0003\b\u0005\bE\n\b\u0003\b\u0003\b\u0003\b\u0006\bJ\n\b",
    "\r\b\u000e\bK\u0007\bN\n\b\f\b\u000e\bQ\u000b\b\u0003\t\u0003\t\u0003",
    "\t\u0003\t\u0005\tW\n\t\u0003\n\u0003\n\u0003\n\u0002\u0003\u000e\u000b",
    "\u0002\u0004\u0006\b\n\f\u000e\u0010\u0012\u0002\u0002\u0002^\u0002",
    "\u0017\u0003\u0002\u0002\u0002\u0004!\u0003\u0002\u0002\u0002\u0006",
    "(\u0003\u0002\u0002\u0002\b*\u0003\u0002\u0002\u0002\n5\u0003\u0002",
    "\u0002\u0002\f9\u0003\u0002\u0002\u0002\u000eD\u0003\u0002\u0002\u0002",
    "\u0010V\u0003\u0002\u0002\u0002\u0012X\u0003\u0002\u0002\u0002\u0014",
    "\u0016\u0005\u0004\u0003\u0002\u0015\u0014\u0003\u0002\u0002\u0002\u0016",
    "\u0019\u0003\u0002\u0002\u0002\u0017\u0015\u0003\u0002\u0002\u0002\u0017",
    "\u0018\u0003\u0002\u0002\u0002\u0018\u001a\u0003\u0002\u0002\u0002\u0019",
    "\u0017\u0003\u0002\u0002\u0002\u001a\u001b\u0007\u0002\u0002\u0003\u001b",
    "\u0003\u0003\u0002\u0002\u0002\u001c\"\u0005\b\u0005\u0002\u001d\"\u0005",
    "\n\u0006\u0002\u001e\"\u0005\f\u0007\u0002\u001f\"\u0005\u0006\u0004",
    "\u0002 \"\u0007\u0011\u0002\u0002!\u001c\u0003\u0002\u0002\u0002!\u001d",
    "\u0003\u0002\u0002\u0002!\u001e\u0003\u0002\u0002\u0002!\u001f\u0003",
    "\u0002\u0002\u0002! \u0003\u0002\u0002\u0002\"\u0005\u0003\u0002\u0002",
    "\u0002#$\u0007\u0003\u0002\u0002$%\u0007\u000f\u0002\u0002%)\u0007\t",
    "\u0002\u0002&\'\u0007\u0003\u0002\u0002\')\u0005\f\u0007\u0002(#\u0003",
    "\u0002\u0002\u0002(&\u0003\u0002\u0002\u0002)\u0007\u0003\u0002\u0002",
    "\u0002*+\u0007\u0004\u0002\u0002+,\u0007\n\u0002\u0002,-\u0005\u000e",
    "\b\u0002-/\u0007\u000b\u0002\u0002.0\u0005\u0004\u0003\u0002/.\u0003",
    "\u0002\u0002\u000201\u0003\u0002\u0002\u00021/\u0003\u0002\u0002\u0002",
    "12\u0003\u0002\u0002\u000223\u0003\u0002\u0002\u000234\u0007\u0005\u0002",
    "\u00024\t\u0003\u0002\u0002\u000256\u0007\u0006\u0002\u000267\u0005",
    "\u0010\t\u000278\u0007\t\u0002\u00028\u000b\u0003\u0002\u0002\u0002",
    "9:\u0007\u000f\u0002\u0002:;\u0007\u0007\u0002\u0002;<\u0005\u000e\b",
    "\u0002<=\u0007\t\u0002\u0002=\r\u0003\u0002\u0002\u0002>?\b\b\u0001",
    "\u0002?E\u0005\u0010\t\u0002@A\u0007\n\u0002\u0002AB\u0005\u000e\b\u0002",
    "BC\u0007\u000b\u0002\u0002CE\u0003\u0002\u0002\u0002D>\u0003\u0002\u0002",
    "\u0002D@\u0003\u0002\u0002\u0002EO\u0003\u0002\u0002\u0002FI\f\u0004",
    "\u0002\u0002GH\u0007\b\u0002\u0002HJ\u0005\u000e\b\u0002IG\u0003\u0002",
    "\u0002\u0002JK\u0003\u0002\u0002\u0002KI\u0003\u0002\u0002\u0002KL\u0003",
    "\u0002\u0002\u0002LN\u0003\u0002\u0002\u0002MF\u0003\u0002\u0002\u0002",
    "NQ\u0003\u0002\u0002\u0002OM\u0003\u0002\u0002\u0002OP\u0003\u0002\u0002",
    "\u0002P\u000f\u0003\u0002\u0002\u0002QO\u0003\u0002\u0002\u0002RW\u0005",
    "\u0012\n\u0002SW\u0007\f\u0002\u0002TW\u0007\u000e\u0002\u0002UW\u0007",
    "\r\u0002\u0002VR\u0003\u0002\u0002\u0002VS\u0003\u0002\u0002\u0002V",
    "T\u0003\u0002\u0002\u0002VU\u0003\u0002\u0002\u0002W\u0011\u0003\u0002",
    "\u0002\u0002XY\u0007\u000f\u0002\u0002Y\u0013\u0003\u0002\u0002\u0002",
    "\n\u0017!(1DKOV"].join("");


const atn = new antlr4.atn.ATNDeserializer().deserialize(serializedATN);

const decisionsToDFA = atn.decisionToState.map( (ds, index) => new antlr4.dfa.DFA(ds, index) );

const sharedContextCache = new antlr4.PredictionContextCache();

export default class SpreadsheetParser extends antlr4.Parser {

    static grammarFileName = "Spreadsheet.g4";
    static literalNames = [ null, null, "'if'", "'endif'", "'print'", "'='", 
                            null, "';'", "'('", "')'" ];
    static symbolicNames = [ null, "TYPE", "IF", "ENDIF", "PRINT", "ASSIGN", 
                             "OP", "SEMICOLON", "LPAREN", "RPAREN", "INTEGER", 
                             "BOOLEAN", "STRING", "NAME", "Space", "LINECOMMENT" ];
    static ruleNames = [ "program", "statement", "declaration", "ifstmt", 
                         "printstmt", "assignstmt", "expression", "term", 
                         "identifier" ];

    constructor(input) {
        super(input);
        this._interp = new antlr4.atn.ParserATNSimulator(this, atn, decisionsToDFA, sharedContextCache);
        this.ruleNames = SpreadsheetParser.ruleNames;
        this.literalNames = SpreadsheetParser.literalNames;
        this.symbolicNames = SpreadsheetParser.symbolicNames;
    }

    get atn() {
        return atn;
    }

    sempred(localctx, ruleIndex, predIndex) {
    	switch(ruleIndex) {
    	case 6:
    	    		return this.expression_sempred(localctx, predIndex);
        default:
            throw "No predicate with index:" + ruleIndex;
       }
    }

    expression_sempred(localctx, predIndex) {
    	switch(predIndex) {
    		case 0:
    			return this.precpred(this._ctx, 2);
    		default:
    			throw "No predicate with index:" + predIndex;
    	}
    };




	program() {
	    let localctx = new ProgramContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 0, SpreadsheetParser.RULE_program);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 21;
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SpreadsheetParser.TYPE) | (1 << SpreadsheetParser.IF) | (1 << SpreadsheetParser.PRINT) | (1 << SpreadsheetParser.NAME) | (1 << SpreadsheetParser.LINECOMMENT))) !== 0)) {
	            this.state = 18;
	            this.statement();
	            this.state = 23;
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        }
	        this.state = 24;
	        this.match(SpreadsheetParser.EOF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	statement() {
	    let localctx = new StatementContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 2, SpreadsheetParser.RULE_statement);
	    try {
	        this.state = 31;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case SpreadsheetParser.IF:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 26;
	            this.ifstmt();
	            break;
	        case SpreadsheetParser.PRINT:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 27;
	            this.printstmt();
	            break;
	        case SpreadsheetParser.NAME:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 28;
	            this.assignstmt();
	            break;
	        case SpreadsheetParser.TYPE:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 29;
	            this.declaration();
	            break;
	        case SpreadsheetParser.LINECOMMENT:
	            this.enterOuterAlt(localctx, 5);
	            this.state = 30;
	            this.match(SpreadsheetParser.LINECOMMENT);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	declaration() {
	    let localctx = new DeclarationContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 4, SpreadsheetParser.RULE_declaration);
	    try {
	        this.state = 38;
	        this._errHandler.sync(this);
	        var la_ = this._interp.adaptivePredict(this._input,2,this._ctx);
	        switch(la_) {
	        case 1:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 33;
	            this.match(SpreadsheetParser.TYPE);
	            this.state = 34;
	            this.match(SpreadsheetParser.NAME);
	            this.state = 35;
	            this.match(SpreadsheetParser.SEMICOLON);
	            break;

	        case 2:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 36;
	            this.match(SpreadsheetParser.TYPE);
	            this.state = 37;
	            this.assignstmt();
	            break;

	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	ifstmt() {
	    let localctx = new IfstmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 6, SpreadsheetParser.RULE_ifstmt);
	    var _la = 0; // Token type
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 40;
	        this.match(SpreadsheetParser.IF);
	        this.state = 41;
	        this.match(SpreadsheetParser.LPAREN);
	        this.state = 42;
	        this.expression(0);
	        this.state = 43;
	        this.match(SpreadsheetParser.RPAREN);
	        this.state = 45; 
	        this._errHandler.sync(this);
	        _la = this._input.LA(1);
	        do {
	            this.state = 44;
	            this.statement();
	            this.state = 47; 
	            this._errHandler.sync(this);
	            _la = this._input.LA(1);
	        } while((((_la) & ~0x1f) == 0 && ((1 << _la) & ((1 << SpreadsheetParser.TYPE) | (1 << SpreadsheetParser.IF) | (1 << SpreadsheetParser.PRINT) | (1 << SpreadsheetParser.NAME) | (1 << SpreadsheetParser.LINECOMMENT))) !== 0));
	        this.state = 49;
	        this.match(SpreadsheetParser.ENDIF);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	printstmt() {
	    let localctx = new PrintstmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 8, SpreadsheetParser.RULE_printstmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 51;
	        this.match(SpreadsheetParser.PRINT);
	        this.state = 52;
	        this.term();
	        this.state = 53;
	        this.match(SpreadsheetParser.SEMICOLON);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	assignstmt() {
	    let localctx = new AssignstmtContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 10, SpreadsheetParser.RULE_assignstmt);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 55;
	        this.match(SpreadsheetParser.NAME);
	        this.state = 56;
	        this.match(SpreadsheetParser.ASSIGN);
	        this.state = 57;
	        this.expression(0);
	        this.state = 58;
	        this.match(SpreadsheetParser.SEMICOLON);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


	expression(_p) {
		if(_p===undefined) {
		    _p = 0;
		}
	    const _parentctx = this._ctx;
	    const _parentState = this.state;
	    let localctx = new ExpressionContext(this, this._ctx, _parentState);
	    let _prevctx = localctx;
	    const _startState = 12;
	    this.enterRecursionRule(localctx, 12, SpreadsheetParser.RULE_expression, _p);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 66;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case SpreadsheetParser.INTEGER:
	        case SpreadsheetParser.BOOLEAN:
	        case SpreadsheetParser.STRING:
	        case SpreadsheetParser.NAME:
	            localctx = new TermExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 61;
	            this.term();
	            break;
	        case SpreadsheetParser.LPAREN:
	            localctx = new ParenExprContext(this, localctx);
	            this._ctx = localctx;
	            _prevctx = localctx;

	            this.state = 62;
	            this.match(SpreadsheetParser.LPAREN);
	            this.state = 63;
	            this.expression(0);
	            this.state = 64;
	            this.match(SpreadsheetParser.RPAREN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	        this._ctx.stop = this._input.LT(-1);
	        this.state = 77;
	        this._errHandler.sync(this);
	        var _alt = this._interp.adaptivePredict(this._input,6,this._ctx)
	        while(_alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER) {
	            if(_alt===1) {
	                if(this._parseListeners!==null) {
	                    this.triggerExitRuleEvent();
	                }
	                _prevctx = localctx;
	                localctx = new OpExprContext(this, new ExpressionContext(this, _parentctx, _parentState));
	                this.pushNewRecursionContext(localctx, _startState, SpreadsheetParser.RULE_expression);
	                this.state = 68;
	                if (!( this.precpred(this._ctx, 2))) {
	                    throw new antlr4.error.FailedPredicateException(this, "this.precpred(this._ctx, 2)");
	                }
	                this.state = 71; 
	                this._errHandler.sync(this);
	                var _alt = 1;
	                do {
	                	switch (_alt) {
	                	case 1:
	                		this.state = 69;
	                		this.match(SpreadsheetParser.OP);
	                		this.state = 70;
	                		this.expression(0);
	                		break;
	                	default:
	                		throw new antlr4.error.NoViableAltException(this);
	                	}
	                	this.state = 73; 
	                	this._errHandler.sync(this);
	                	_alt = this._interp.adaptivePredict(this._input,5, this._ctx);
	                } while ( _alt!=2 && _alt!=antlr4.atn.ATN.INVALID_ALT_NUMBER ); 
	            }
	            this.state = 79;
	            this._errHandler.sync(this);
	            _alt = this._interp.adaptivePredict(this._input,6,this._ctx);
	        }

	    } catch( error) {
	        if(error instanceof antlr4.error.RecognitionException) {
		        localctx.exception = error;
		        this._errHandler.reportError(this, error);
		        this._errHandler.recover(this, error);
		    } else {
		    	throw error;
		    }
	    } finally {
	        this.unrollRecursionContexts(_parentctx)
	    }
	    return localctx;
	}



	term() {
	    let localctx = new TermContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 14, SpreadsheetParser.RULE_term);
	    try {
	        this.state = 84;
	        this._errHandler.sync(this);
	        switch(this._input.LA(1)) {
	        case SpreadsheetParser.NAME:
	            this.enterOuterAlt(localctx, 1);
	            this.state = 80;
	            this.identifier();
	            break;
	        case SpreadsheetParser.INTEGER:
	            this.enterOuterAlt(localctx, 2);
	            this.state = 81;
	            this.match(SpreadsheetParser.INTEGER);
	            break;
	        case SpreadsheetParser.STRING:
	            this.enterOuterAlt(localctx, 3);
	            this.state = 82;
	            this.match(SpreadsheetParser.STRING);
	            break;
	        case SpreadsheetParser.BOOLEAN:
	            this.enterOuterAlt(localctx, 4);
	            this.state = 83;
	            this.match(SpreadsheetParser.BOOLEAN);
	            break;
	        default:
	            throw new antlr4.error.NoViableAltException(this);
	        }
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}



	identifier() {
	    let localctx = new IdentifierContext(this, this._ctx, this.state);
	    this.enterRule(localctx, 16, SpreadsheetParser.RULE_identifier);
	    try {
	        this.enterOuterAlt(localctx, 1);
	        this.state = 86;
	        this.match(SpreadsheetParser.NAME);
	    } catch (re) {
	    	if(re instanceof antlr4.error.RecognitionException) {
		        localctx.exception = re;
		        this._errHandler.reportError(this, re);
		        this._errHandler.recover(this, re);
		    } else {
		    	throw re;
		    }
	    } finally {
	        this.exitRule();
	    }
	    return localctx;
	}


}

SpreadsheetParser.EOF = antlr4.Token.EOF;
SpreadsheetParser.TYPE = 1;
SpreadsheetParser.IF = 2;
SpreadsheetParser.ENDIF = 3;
SpreadsheetParser.PRINT = 4;
SpreadsheetParser.ASSIGN = 5;
SpreadsheetParser.OP = 6;
SpreadsheetParser.SEMICOLON = 7;
SpreadsheetParser.LPAREN = 8;
SpreadsheetParser.RPAREN = 9;
SpreadsheetParser.INTEGER = 10;
SpreadsheetParser.BOOLEAN = 11;
SpreadsheetParser.STRING = 12;
SpreadsheetParser.NAME = 13;
SpreadsheetParser.Space = 14;
SpreadsheetParser.LINECOMMENT = 15;

SpreadsheetParser.RULE_program = 0;
SpreadsheetParser.RULE_statement = 1;
SpreadsheetParser.RULE_declaration = 2;
SpreadsheetParser.RULE_ifstmt = 3;
SpreadsheetParser.RULE_printstmt = 4;
SpreadsheetParser.RULE_assignstmt = 5;
SpreadsheetParser.RULE_expression = 6;
SpreadsheetParser.RULE_term = 7;
SpreadsheetParser.RULE_identifier = 8;

class ProgramContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_program;
    }

	EOF() {
	    return this.getToken(SpreadsheetParser.EOF, 0);
	};

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterProgram(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitProgram(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitProgram(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class StatementContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_statement;
    }

	ifstmt() {
	    return this.getTypedRuleContext(IfstmtContext,0);
	};

	printstmt() {
	    return this.getTypedRuleContext(PrintstmtContext,0);
	};

	assignstmt() {
	    return this.getTypedRuleContext(AssignstmtContext,0);
	};

	declaration() {
	    return this.getTypedRuleContext(DeclarationContext,0);
	};

	LINECOMMENT() {
	    return this.getToken(SpreadsheetParser.LINECOMMENT, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterStatement(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitStatement(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitStatement(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class DeclarationContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_declaration;
    }

	TYPE() {
	    return this.getToken(SpreadsheetParser.TYPE, 0);
	};

	NAME() {
	    return this.getToken(SpreadsheetParser.NAME, 0);
	};

	SEMICOLON() {
	    return this.getToken(SpreadsheetParser.SEMICOLON, 0);
	};

	assignstmt() {
	    return this.getTypedRuleContext(AssignstmtContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterDeclaration(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitDeclaration(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitDeclaration(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IfstmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_ifstmt;
    }

	IF() {
	    return this.getToken(SpreadsheetParser.IF, 0);
	};

	LPAREN() {
	    return this.getToken(SpreadsheetParser.LPAREN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(SpreadsheetParser.RPAREN, 0);
	};

	ENDIF() {
	    return this.getToken(SpreadsheetParser.ENDIF, 0);
	};

	statement = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(StatementContext);
	    } else {
	        return this.getTypedRuleContext(StatementContext,i);
	    }
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterIfstmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitIfstmt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitIfstmt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class PrintstmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_printstmt;
    }

	PRINT() {
	    return this.getToken(SpreadsheetParser.PRINT, 0);
	};

	term() {
	    return this.getTypedRuleContext(TermContext,0);
	};

	SEMICOLON() {
	    return this.getToken(SpreadsheetParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterPrintstmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitPrintstmt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitPrintstmt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class AssignstmtContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_assignstmt;
    }

	NAME() {
	    return this.getToken(SpreadsheetParser.NAME, 0);
	};

	ASSIGN() {
	    return this.getToken(SpreadsheetParser.ASSIGN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	SEMICOLON() {
	    return this.getToken(SpreadsheetParser.SEMICOLON, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterAssignstmt(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitAssignstmt(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitAssignstmt(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class ExpressionContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_expression;
    }


	 
		copyFrom(ctx) {
			super.copyFrom(ctx);
		}

}


class OpExprContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	expression = function(i) {
	    if(i===undefined) {
	        i = null;
	    }
	    if(i===null) {
	        return this.getTypedRuleContexts(ExpressionContext);
	    } else {
	        return this.getTypedRuleContext(ExpressionContext,i);
	    }
	};

	OP = function(i) {
		if(i===undefined) {
			i = null;
		}
	    if(i===null) {
	        return this.getTokens(SpreadsheetParser.OP);
	    } else {
	        return this.getToken(SpreadsheetParser.OP, i);
	    }
	};


	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterOpExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitOpExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitOpExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

SpreadsheetParser.OpExprContext = OpExprContext;

class TermExprContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	term() {
	    return this.getTypedRuleContext(TermContext,0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterTermExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitTermExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitTermExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

SpreadsheetParser.TermExprContext = TermExprContext;

class ParenExprContext extends ExpressionContext {

    constructor(parser, ctx) {
        super(parser);
        super.copyFrom(ctx);
    }

	LPAREN() {
	    return this.getToken(SpreadsheetParser.LPAREN, 0);
	};

	expression() {
	    return this.getTypedRuleContext(ExpressionContext,0);
	};

	RPAREN() {
	    return this.getToken(SpreadsheetParser.RPAREN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterParenExpr(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitParenExpr(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitParenExpr(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}

SpreadsheetParser.ParenExprContext = ParenExprContext;

class TermContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_term;
    }

	identifier() {
	    return this.getTypedRuleContext(IdentifierContext,0);
	};

	INTEGER() {
	    return this.getToken(SpreadsheetParser.INTEGER, 0);
	};

	STRING() {
	    return this.getToken(SpreadsheetParser.STRING, 0);
	};

	BOOLEAN() {
	    return this.getToken(SpreadsheetParser.BOOLEAN, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterTerm(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitTerm(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitTerm(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}



class IdentifierContext extends antlr4.ParserRuleContext {

    constructor(parser, parent, invokingState) {
        if(parent===undefined) {
            parent = null;
        }
        if(invokingState===undefined || invokingState===null) {
            invokingState = -1;
        }
        super(parent, invokingState);
        this.parser = parser;
        this.ruleIndex = SpreadsheetParser.RULE_identifier;
    }

	NAME() {
	    return this.getToken(SpreadsheetParser.NAME, 0);
	};

	enterRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.enterIdentifier(this);
		}
	}

	exitRule(listener) {
	    if(listener instanceof SpreadsheetListener ) {
	        listener.exitIdentifier(this);
		}
	}

	accept(visitor) {
	    if ( visitor instanceof SpreadsheetVisitor ) {
	        return visitor.visitIdentifier(this);
	    } else {
	        return visitor.visitChildren(this);
	    }
	}


}




SpreadsheetParser.ProgramContext = ProgramContext; 
SpreadsheetParser.StatementContext = StatementContext; 
SpreadsheetParser.DeclarationContext = DeclarationContext; 
SpreadsheetParser.IfstmtContext = IfstmtContext; 
SpreadsheetParser.PrintstmtContext = PrintstmtContext; 
SpreadsheetParser.AssignstmtContext = AssignstmtContext; 
SpreadsheetParser.ExpressionContext = ExpressionContext; 
SpreadsheetParser.TermContext = TermContext; 
SpreadsheetParser.IdentifierContext = IdentifierContext; 

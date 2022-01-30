// Generated from c:\Users\vitic\WebstormProjects\intentoLexAnalyser\src\grammar\Hello.g4 by ANTLR 4.8
import org.antlr.v4.runtime.Lexer;
import org.antlr.v4.runtime.CharStream;
import org.antlr.v4.runtime.Token;
import org.antlr.v4.runtime.TokenStream;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.misc.*;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class Hello extends Lexer {
	static { RuntimeMetaData.checkVersion("4.8", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		ESPACIO=1, RESERVADAS=2, OP=3, COMP=4, OPAR=5, CPAR=6, SEP=7, EQ=8, AND=9, 
		OR=10, NUMBER=11, ID=12, STRING=13, NL=14, COMMENT=15;
	public static String[] channelNames = {
		"DEFAULT_TOKEN_CHANNEL", "HIDDEN"
	};

	public static String[] modeNames = {
		"DEFAULT_MODE"
	};

	private static String[] makeRuleNames() {
		return new String[] {
			"ESPACIO", "RESERVADAS", "OP", "COMP", "OPAR", "CPAR", "SEP", "EQ", "AND", 
			"OR", "NUMBER", "ID", "STRING", "NL", "COMMENT"
		};
	}
	public static final String[] ruleNames = makeRuleNames();

	private static String[] makeLiteralNames() {
		return new String[] {
			null, null, null, null, null, "'('", "')'", "';'", "'='", "'and'", "'or'"
		};
	}
	private static final String[] _LITERAL_NAMES = makeLiteralNames();
	private static String[] makeSymbolicNames() {
		return new String[] {
			null, "ESPACIO", "RESERVADAS", "OP", "COMP", "OPAR", "CPAR", "SEP", "EQ", 
			"AND", "OR", "NUMBER", "ID", "STRING", "NL", "COMMENT"
		};
	}
	private static final String[] _SYMBOLIC_NAMES = makeSymbolicNames();
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}


	public Hello(CharStream input) {
		super(input);
		_interp = new LexerATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}

	@Override
	public String getGrammarFileName() { return "Hello.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public String[] getChannelNames() { return channelNames; }

	@Override
	public String[] getModeNames() { return modeNames; }

	@Override
	public ATN getATN() { return _ATN; }

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\2\21\u0084\b\1\4\2"+
		"\t\2\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4"+
		"\13\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\3\2\6\2#\n\2\r"+
		"\2\16\2$\3\2\3\2\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3\3"+
		"\3\5\3\67\n\3\3\4\3\4\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\5\5D\n\5\3\6"+
		"\3\6\3\7\3\7\3\b\3\b\3\t\3\t\3\n\3\n\3\n\3\n\3\13\3\13\3\13\3\f\7\fV\n"+
		"\f\f\f\16\fY\13\f\3\f\5\f\\\n\f\3\f\6\f_\n\f\r\f\16\f`\3\r\3\r\7\re\n"+
		"\r\f\r\16\rh\13\r\3\16\3\16\7\16l\n\16\f\16\16\16o\13\16\3\16\3\16\3\17"+
		"\5\17t\n\17\3\17\3\17\5\17x\n\17\3\20\3\20\3\20\3\20\7\20~\n\20\f\20\16"+
		"\20\u0081\13\20\3\20\3\20\3\177\2\21\3\3\5\4\7\5\t\6\13\7\r\b\17\t\21"+
		"\n\23\13\25\f\27\r\31\16\33\17\35\20\37\21\3\2\t\4\2\13\f\17\17\6\2\'"+
		"\',-//\61\61\4\2>>@@\3\2\62;\5\2C\\aac|\6\2\62;C\\aac|\5\2\f\f\17\17$"+
		"$\2\u0093\2\3\3\2\2\2\2\5\3\2\2\2\2\7\3\2\2\2\2\t\3\2\2\2\2\13\3\2\2\2"+
		"\2\r\3\2\2\2\2\17\3\2\2\2\2\21\3\2\2\2\2\23\3\2\2\2\2\25\3\2\2\2\2\27"+
		"\3\2\2\2\2\31\3\2\2\2\2\33\3\2\2\2\2\35\3\2\2\2\2\37\3\2\2\2\3\"\3\2\2"+
		"\2\5\66\3\2\2\2\78\3\2\2\2\tC\3\2\2\2\13E\3\2\2\2\rG\3\2\2\2\17I\3\2\2"+
		"\2\21K\3\2\2\2\23M\3\2\2\2\25Q\3\2\2\2\27[\3\2\2\2\31b\3\2\2\2\33i\3\2"+
		"\2\2\35w\3\2\2\2\37y\3\2\2\2!#\t\2\2\2\"!\3\2\2\2#$\3\2\2\2$\"\3\2\2\2"+
		"$%\3\2\2\2%&\3\2\2\2&\'\b\2\2\2\'\4\3\2\2\2()\7k\2\2)*\7p\2\2*\67\7v\2"+
		"\2+,\7k\2\2,\67\7h\2\2-.\7g\2\2./\7n\2\2/\60\7u\2\2\60\67\7g\2\2\61\62"+
		"\7y\2\2\62\63\7j\2\2\63\64\7k\2\2\64\65\7n\2\2\65\67\7g\2\2\66(\3\2\2"+
		"\2\66+\3\2\2\2\66-\3\2\2\2\66\61\3\2\2\2\67\6\3\2\2\289\t\3\2\29\b\3\2"+
		"\2\2:D\t\4\2\2;<\7>\2\2<D\7?\2\2=>\7@\2\2>D\7?\2\2?@\7?\2\2@D\7?\2\2A"+
		"B\7#\2\2BD\7?\2\2C:\3\2\2\2C;\3\2\2\2C=\3\2\2\2C?\3\2\2\2CA\3\2\2\2D\n"+
		"\3\2\2\2EF\7*\2\2F\f\3\2\2\2GH\7+\2\2H\16\3\2\2\2IJ\7=\2\2J\20\3\2\2\2"+
		"KL\7?\2\2L\22\3\2\2\2MN\7c\2\2NO\7p\2\2OP\7f\2\2P\24\3\2\2\2QR\7q\2\2"+
		"RS\7t\2\2S\26\3\2\2\2TV\t\5\2\2UT\3\2\2\2VY\3\2\2\2WU\3\2\2\2WX\3\2\2"+
		"\2XZ\3\2\2\2YW\3\2\2\2Z\\\7\60\2\2[W\3\2\2\2[\\\3\2\2\2\\^\3\2\2\2]_\t"+
		"\5\2\2^]\3\2\2\2_`\3\2\2\2`^\3\2\2\2`a\3\2\2\2a\30\3\2\2\2bf\t\6\2\2c"+
		"e\t\7\2\2dc\3\2\2\2eh\3\2\2\2fd\3\2\2\2fg\3\2\2\2g\32\3\2\2\2hf\3\2\2"+
		"\2im\7$\2\2jl\n\b\2\2kj\3\2\2\2lo\3\2\2\2mk\3\2\2\2mn\3\2\2\2np\3\2\2"+
		"\2om\3\2\2\2pq\7$\2\2q\34\3\2\2\2rt\7\17\2\2sr\3\2\2\2st\3\2\2\2tu\3\2"+
		"\2\2ux\7\f\2\2vx\7\17\2\2ws\3\2\2\2wv\3\2\2\2x\36\3\2\2\2yz\7\61\2\2z"+
		"{\7\61\2\2{\177\3\2\2\2|~\13\2\2\2}|\3\2\2\2~\u0081\3\2\2\2\177\u0080"+
		"\3\2\2\2\177}\3\2\2\2\u0080\u0082\3\2\2\2\u0081\177\3\2\2\2\u0082\u0083"+
		"\b\20\2\2\u0083 \3\2\2\2\16\2$\66CW[`fmsw\177\3\b\2\2";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}
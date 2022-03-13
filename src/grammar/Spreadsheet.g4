grammar Spreadsheet;

program: statement* EOF;

// Parse rule for statements
statement: ifstmt | printstmt | assignstmt | declaration | LINECOMMENT;

// Parse rule for variable declarations
declaration:
    TYPE NAME SEMICOLON
    | TYPE assignstmt
    ;
TYPE: 'int' | 'bool' | 'string';

// Parse rule for if statements

ifstmt: IF LPAREN expression RPAREN statement+ ENDIF;

// Parse rule for print statements

printstmt: PRINT term SEMICOLON;

// Parse rule for assignment statements

assignstmt: NAME ASSIGN expression SEMICOLON;

// Parse rule for expressions
expression:
term #termExpr
	| expression (OP expression)+	# opExpr
	| (LPAREN expression RPAREN)			# parenExpr
;
// Parse rule for terms

term: identifier | INTEGER | STRING | BOOLEAN;

// Parse rule for identifiers

identifier: NAME;


// Reserved Keywords //////////////////////////////


IF: 'if';
ENDIF: 'endif';
PRINT: 'print';

// Operators
ASSIGN: '=';
OP: '+' | '-' | '*' | '/' | '%' | '==' | '!=' | '>' | '<' | '>=' | '<=';

// Semicolon and parentheses
SEMICOLON: ';';
LPAREN: '(';
RPAREN: ')';

// Integers
INTEGER: [0-9][0-9]*;
// boolean
BOOLEAN: 'true' | 'false';


// Strings
STRING: '"' .*? '"';


// Variable names
NAME: [a-zA-Z][a-zA-Z0-9]*;

// Ignore all white spaces 
Space
  :  (' ' | '\t' | '\n' | 'r')+ -> skip;
// mark lines starting with '#' as Comment
LINECOMMENT:   '#' ~( '\r' | '\n' )*;

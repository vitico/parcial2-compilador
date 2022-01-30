lexer grammar Hello;
//L:[a-zA-Z_]+; //contiene letras de A-Z
//D:[0-9]+; //esto es para los numeros
ESPACIO: [\t\r\n]+ -> skip; //esto es para evitar los espacios en blancos
RESERVADAS: 'int'|
            'if'|
            'else'|
            'while';
OP : '+' | '-' | '*' | '/' | '%';
COMP: '<' | '>' | '<=' | '>=' | '==' | '!=';
OPAR   : '(';
CPAR   : ')';
SEP : ';';
EQ    : '=';
AND    : 'and';
OR     : 'or';
NUMBER : ( [0-9]* '.' )? [0-9]+;
ID     : [a-zA-Z_] [a-zA-Z_0-9]*;
STRING : '"' ~["\r\n]* '"';
NL     : '\r'? '\n' | '\r';
COMMENT : ('//' .*? )-> skip; //algunos simbolos a ignorar

// lexer grammar Hello;


// ADD    : '+';
// MINUS  : '-';
// MULT   : '*';
// DIV    : '/';
// MOD    : '%';
// OPAR   : '(';
// CPAR   : ')';
// LTE    : '<=';
// LT     : '<';
// GTE    : '>=';
// GT     : '>';
// EQ     : '=';
// NEQ    : '!=';
// AND    : 'and';
// OR     : 'or';
// NUMBER : ( [0-9]* '.' )? [0-9]+;
// ID     : [a-zA-Z_] [a-zA-Z_0-9]*;
// STRING : '"' ~["\r\n]* '"';
// NL     : '\r'? '\n' | '\r';
// SPACE  : [ \t] -> skip;
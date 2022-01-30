import antlr4 from 'antlr4';
import MyGrammarLexer from './grammar/Hello.js';

const input = `int x = "Hello World";
int x2=23;`
const chars = new antlr4.InputStream(input);
const lexer = new MyGrammarLexer(chars);
const tokens = new antlr4.CommonTokenStream(lexer);
let finalTokens =[];
do{
   var token = tokens.LT();
   if(token.type == -1 || !token) break;
   finalTokens.push([token.text, MyGrammarLexer.symbolicNames[token.type]]);
   tokens.consume();

}while(true);
console.log(finalTokens);

// var extractor = new JSListener()
// antlr4.tree.ParseTreeWalker.DEFAULT.walk(extractor, tree)
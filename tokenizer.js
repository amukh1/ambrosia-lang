let tokens = [
    [/^\s+/, null],
    // semicolon
    [/^;/, 'SEMI'],
    // comments
    [/^\/\/.*/, null],
    // multiline comments
    [/^\/\*[\s\S]*?\*\//, null],
   [/^[\d\.]+/, 'NUMBER'],
    // literals: string
    [/^"[^"]*"|^'[^']*'/, 'STRING'],
  // commas
  // [/^\,/,'COMMA'],
  // paren
  [/^\(/,'O-PAREN'],
  [/^\)/,'C-PAREN'],
  // brackets
  [/^\{/,'O-BRACE'],
  [/^\}/,'C-BRACE'],
  [/^\[/,'O-BRACK'],
  [/^\]/,'C-BRACK'],
    [/^\!/,'EXPI'],
  
    [/^=/,'DECLARATION'],
  [/^==/,'EQUALITY'],
    [/^\,/,'COMMA'],
    [/^\+/,'ADD'],
  [/^-/,'SUB'],
  [/^\*/,'MULT'],
  [/^\//,'DIV'],
  [/^\.\./,'CONCAT'],
    // words/vars
    [/^[a-zA-Z]*/,'WORD'],
  
]

class Lexer {
  constructor(i) {
    this._string = i;
    this._cursor = 0;
  }
  get_cursor() {
    return this._cursor;
}
isEOF(){
    return this._cursor < this._string.length;
}
  getNextToken(){
    // console.log(`lost at ${this._string.slice(this._cursor)}`)
    if(!this.isEOF()){
        return {
            type: 'EOF',
            value: '',
        };
    }

    const string = this._string.slice(this._cursor);
    for(const [regex, tokenType] of tokens){
        const tokenValue = this._match(regex, string);
        // console.log(tokenType)
        if(tokenValue == null){
            continue;
        }

        if(tokenType == null){
            this._cursor += tokenValue.length;
            return this.getNextToken();
        }

        this._cursor += tokenValue.length;

        if(tokenType == 'STRING'){
        return {
                type: tokenType,
                value: tokenValue,
            }
        }
        // console.log(string[0].match(/^([a-zA-Z]*)/))
        return {
            type: tokenType,
            value: tokenValue,
        }
    }
    console.log('thisfar')
    throw new SyntaxError(`Unexpected token: "${string[0]}" at line ${this._string.slice(0, this._cursor).split('\n').length}, position: ${this._cursor - 1}`);
}
  _match(regexp, string){
    // console.log(regexp, string);
    // console.log(regexp.exec(string));
    const matched = regexp.exec(string);
    if(matched == null){
        return null
    }
    // this._cursor += matched[0].length;
    return matched[0];
}
Tokenize(){
    const tokens = [];
    while(this.isEOF()){
        tokens.push(this.getNextToken());
    }
    return tokens;
}
}

export default Lexer
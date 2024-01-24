
function isNumber(ch) {
    return "0" <= ch && ch <= "9";
}
function isAlpha(ch) {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch == "_";
}
export const lexer = function (str) {

    let start = 0;
    let current = 0;
    let currentline = 1;
    const tokens = [];
    function scanToken() { }

    function isAtEnd() {
        return current >= str.length;
    }

    function advance() {
        current++;
        return str[current - 1];
    }

    function scanToken() {
        let character = advance();
        console.log(character);

    }

    while (!isAtEnd()) {
        start = current;
        scanToken();
        //todo: finished the comparisons of lexemes. 
    }
    tokens.push({
        type: "EOF",
        lexeme: "",
        literal: undefined,
        line: currentline
    })
    return tokens;

}


const tokenTypes = {
    LEFT_PAREN: "(",
    RIGHT_PAREN: ")",
    LEFT_BRACE: "{",
    RIGHT_BRACE: "}",
    COMMA: ",",
    DOT: ".",
    MINUS: "-",
    PLUS: "+",
    SEMICOLON: ";",
    SLASH: "/",
    STAR: "*",
    MOD: "%",
    BANG: "!",
    BANG_EQUAL: "!=",
    EQUAL: "=",
    EQUAL_EQUAL: "==",
    GREATER: ">",
    GREATER_EQUAL: ">=",
    LESS: "<",
    LESS_EQUAL: "<=",
    IDENTIFIER: "identifier",
    STRING: "string",
    NUMBER: "number",
    EOF: "EOF",
}


const isNumeric = (ch) => {
    return "0" <= ch && ch <= "9";
}
const isAlpha = (ch) => {
    return (ch >= "a" && ch <= "z") || (ch >= "A" && ch <= "Z") || ch == "_";
}

const isAlphaNumeric = (ch) => {
    return isAlpha(ch) || isNumeric(ch);
}
const createtoken = (tokentype, lexe, lit, lineAt) => {
    return {
        type: tokentype,
        lexeme: lexe,
        literal: lit,
        line: lineAt,

    }
}

export const lexer = (str) => {

    let start = 0;
    let current = 0;
    let currentline = 1;
    const tokens = [];

    const isAtEnd = () => {
        return current >= str.length;
    }
    const advance = () => {
        current++;
        return str[current - 1];
    }

    const peek = () => {
        if (isAtEnd()) {
            return '\0';
        }
        return str[current];
    }

    const peekNext = () => {
        if (current + 1 >= str.length) {
            return '\0';

        }
        return str[current + 1];
    }

    const match = (expected) => {
        if (isAtEnd()) {
            return false;
        }
        if (str[current] !== expected) {
            return false;
        }
        current++;
        return true;
    }

    const string = () => {
        while (peek() !== '"' && !isAtEnd()) {
            if (peek() === '\n') {
                currentline++;
            }
            advance();
        }
        if (isAtEnd()) {
            console.log(currentline, "unfinished string.");
            return;
        }
        advance();
        let value = str.substring(start + 1, current - 1);
        let text = str.substring(start, current);
        tokens.push(createtoken("STRING", text, value, currentline));
    }

    const number = () => {
        while (isNumeric(peek())) {
            advance();
        }
        if (peek() === '.' && isNumeric(peekNext())) {
            advance();
            while (isNumeric(peek())) {
                advance();
            }
        }
        let value = str.substring(start, current);
        let text = str.substring(start, current);
        tokens.push(createtoken(
            "NUMBER",
            text,
            value,
            currentline
        ));
    }

    const identifier = () => {
        while (isAlphaNumeric(peek())) {
            advance();
        }
        let text = str.substring(start, current);
        tokens.push(createtoken(
            "IDENTFIER",
            text,
            "",
            currentline
        ));
    }

    const scanToken = () => {
        let character = advance();
        switch (character) {
            case tokenTypes.LEFT_PAREN:
                tokens.push(createtoken("LEFT_PAREN", "", "", currentline));
                break;
            case tokenTypes.RIGHT_PAREN:
                tokens.push(createtoken("RIGHT_PAREN", "", "", currentline));
                break;
            case tokenTypes.LEFT_BRACE:
                tokens.push(createtoken("LEFT_BRACE", "", "", currentline));
                break;
            case tokenTypes.RIGHT_BRACE:
                tokens.push(createtoken("RIGHT_BRACE", "", "", currentline));
                break;
            case tokenTypes.COMMA:
                tokens.push(createtoken("COMMA", "", "", currentline));
                break;
            case tokenTypes.DOT:
                tokens.push(createtoken("DOT", "", "", currentline));
                break;
            case tokenTypes.MINUS:
                tokens.push(createtoken("MINUS", "", "", currentline));
                break;
            case tokenTypes.PLUS:
                tokens.push(createtoken("PLUS", "", "", currentline));
                break;
            case tokenTypes.SEMICOLON:
                tokens.push(createtoken("SEMICOLON", "", "", currentline));
                break;
            case tokenTypes.STAR:
                tokens.push(createtoken("STAR", "", "", currentline));
                break;
            case tokenTypes.MOD:
                tokens.push(createtoken("MOD", "", "", currentline));
                break;
            case tokenTypes.BANG:
                if (match("=")) {
                    tokens.push(createtoken("BANG_EQUAL", "", "", currentline));
                } else {
                    tokens.push(createtoken("BANG", "", "", currentline));
                }
                break;
            case tokenTypes.EQUAL:
                if (match("=")) {
                    tokens.push(createtoken("EQUAL_EQUAL", "", "", currentline));
                } else {
                    tokens.push(createtoken("EQUAL", "", "", currentline));
                }
                break;
            case tokenTypes.LESS:
                if (match("=")) {
                    tokens.push(createtoken("LESS_EQUAL", "", "", currentline));
                } else {
                    tokens.push(createtoken("LESS", "", "", currentline));
                }
                break;
            case tokenTypes.GREATER:
                if (match("=")) {
                    tokens.push(createtoken("GREATER_EQUAL", "", "", currentline));
                } else {
                    tokens.push(createtoken("GREATER", "", "", currentline));
                }
                break;
            case tokenTypes.SLASH:
                if (match("/")) {
                    while (peek() !== "\n" && !isAtEnd()) {
                        advance();
                    }
                } else {
                    tokens.push(createtoken("SLASH", "", "", currentline));
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                currentline++;
                break;
            case '"':
                string();
                break;
            default:
                if (isNumeric(character)) {
                    number();
                } else if (isAlpha(character)) {
                    identifier();
                } else {
                    console.log(line, "unexpected character.")
                }
        }
    }

    while (!isAtEnd()) {
        start = current;
        scanToken();
    }
    tokens.push(createtoken(tokenTypes.EOF, "", undefined, currentline));
    return tokens;
}

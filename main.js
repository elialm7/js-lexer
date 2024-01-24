const source = "";

function* lexer(str) {
    let character = str[0];
    if (character === undefined) {
        yield {
            type: "EOF",
        }
    }

}

//this is the execution section
console.log("Starting lexer...");

for (let token of lexer(source)) {
    console.log(token);
}


console.log("finishing lexer.. ");
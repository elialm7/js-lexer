import { lexer } from "./lexer.js";

const args = process.argv;
let input = "20+((50*8)/54)-36";
console.log(`"input to be tokenized: ${input}"`);
console.log("-------------------------------------------------------------------");
console.log(lexer(input));
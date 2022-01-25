#[macro_use]
mod error;
mod lexer;
mod tokens;
mod parser;
mod nodes;
mod interpreter;

use wasm_bindgen::prelude::*;
use lexer::Lexer;
use parser::Parser;
use interpreter::Interpreter;

#[wasm_bindgen]
pub fn run(code: String) -> String {
    if code.chars().all(|char| [' ', '\t'].contains(&char)) { return String::from(""); }

    // let start = std::time::Instant::now();

    let mut lexer = Lexer::new(&code);
    let tokens = match lexer.scan() {
        Ok(tokens) => tokens,
        Err(e) => { return format!("{}", e); },
    };

    let mut parser = Parser::new(&tokens);
    let nodes = match parser.parse() {
        Ok(nodes) => nodes,
        Err(e) => { return format!("{}", e); },
    };

    let interpreter = Interpreter::new(nodes);
    let out = interpreter.run();
    return format!("{}", out);
}

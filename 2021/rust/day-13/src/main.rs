use std::io::{self, BufRead};

use day_13::{Dot, FoldInstruction, solution};

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let mut dots: Vec<Dot> = Vec::new();

    while let Some(line) = lines.next() {
        match line.unwrap().parse() {
            Ok(dot) => dots.push(dot),
            Err(_) => break,
        }
    }

    let mut fold_instructions: Vec<FoldInstruction> = Vec::new();

    while let Some(line) = lines.next() {
        match line.unwrap().parse() {
            Ok(fold_instruction) => fold_instructions.push(fold_instruction),
            Err(_) => break,
        }
    }

    println!("Dots: {:?} Fold instructions: {:?}", dots, fold_instructions);
    println!("Remaining dots: {:?}", solution(&mut dots, &fold_instructions));
}

use std::io::{self, BufRead};
use std::collections::HashSet;
use serde::Deserialize;
use recap::Recap;

#[derive(Debug, Deserialize, Recap)]
#[recap(regex = r#"(?x)
    ^
    (?P<operation>\w+)
    \s+
    (?P<argument>[+-]\d+)
    $
"#)]
struct Instruction {
    operation: String,
    argument: isize,
}

fn main() {
    let instructions: Vec<Instruction> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    let (accumulator, ended) = calculate(&instructions);

    println!("{}", accumulator);
}

fn repair(instructions: &Vec<Instruction>) -> usize {
    let candidates: Vec<usize> = instructions
        .iter()
        .enumerate()
        .filter(|(_, instruction)| instruction.operation == "jmp" || instruction.operation == "nop")
        .map(|(i, _)| i)
        .collect();

    for index in candidates {
        let new_instructions: &Vec<Instruction> = &instructions
            .iter()
            .enumerate()
            .map(|(i, instruction)| {
                if i != index {
                    instruction
                } else {
                    &Instruction {
                        operation: if instruction.operation == "jmp" { "nop".to_string() } else { "jmp".to_string() },
                        argument: instruction.argument
                    }
                }
            })
            .collect();

        loop {
            let (accumulator, ended) = calculate(&new_instructions);

            if ended { return accumulator }
        }
    };

    0
}

fn calculate(instructions: &Vec<Instruction>) -> (usize, bool) {
    let mut accumulator = 0;
    let mut position = 0;
    let mut visited = HashSet::new();

    while position < instructions.len() as isize && !visited.contains(&position) {
        visited.insert(position);

        let Instruction { operation, argument } = instructions.get(position as usize).unwrap();

        if operation == "jmp" {
            position += argument;
            continue;
        }

        if operation == "acc" {
            accumulator += argument;
        }

        position += 1;
    }

    (accumulator as usize, position as usize == instructions.len())
}

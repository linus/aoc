use std::io::{self, BufRead};
use std::collections::HashSet;
use serde::Deserialize;
use recap::Recap;

#[derive(Copy, Clone, Debug, Deserialize, Recap)]
#[recap(regex = r#"(?x)
    ^
    (?P<operation>\w+)
    \s+
    (?P<argument>[+-]\d+)
    $
"#)]
struct Instruction {
    operation: Operation,
    argument: isize,
}

#[derive(Copy, Clone, Debug, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
enum Operation {
    Jmp,
    Nop,
    Acc,
}

fn main() {
    let instructions: Vec<Instruction> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    let (accumulator, _) = calculate(&instructions);

    println!("{}", accumulator);

    println!("{}", repair(&instructions).unwrap());
}

fn repair(instructions: &[Instruction]) -> Option<usize> {
    let candidates: Vec<Vec<Instruction>> = instructions
        .iter()
        .enumerate()
        .filter(|(_, instruction)| instruction.operation == Operation::Jmp || instruction.operation == Operation::Nop)
        .map(|(index, _)| {
            instructions.iter().enumerate().map(|(i, &instruction)| {
                if i != index {
                    instruction
                } else {
                    Instruction {
                        operation: match instruction.operation {
                            Operation::Jmp => Operation::Nop,
                            Operation::Nop => Operation::Jmp,
                            _ => instruction.operation,
                        },
                        argument: instruction.argument
                    }
                }
            }).collect()
        })
        .collect();

    for candidate in candidates {
        let (accumulator, ended) = calculate(&candidate);

        if ended { return Some(accumulator) }
    };

    None
}

fn calculate(instructions: &[Instruction]) -> (usize, bool) {
    let mut accumulator = 0;
    let mut position = 0;
    let mut visited = HashSet::new();

    while position < instructions.len() as isize && !visited.contains(&position) {
        visited.insert(position);

        let Instruction { operation, argument } = instructions.get(position as usize).unwrap();

        match operation {
            Operation::Jmp => {
                position += argument;
                continue;
            },
            Operation::Acc => accumulator += argument,
            Operation::Nop => {}
        }

        position += 1;
    }

    (accumulator as usize, position as usize == instructions.len())
}

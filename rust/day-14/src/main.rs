use std::io::{self, BufRead};
use std::str::FromStr;

#[derive(Debug)]
enum Instruction {
    Mask(Vec<(char, u64)>),
    Mem((usize, u64))
}

#[derive(Debug)]
enum ParseInstructionError {
    InvalidArgs { details: String }
}

impl FromStr for Instruction {
    type Err = ParseInstructionError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut data = s.split(" = ");

        match data.next() {
            Some("mask") => {
                let mask = data.next().unwrap()
                    .chars()
                    .rev()
                    .enumerate()
                    .map(|(i, c)| (c, 2u64.pow(i as u32)))
                    .collect();

                Ok(Instruction::Mask(mask))
            },
            Some(instr) => {
                let location = instr
                    .strip_prefix("mem[").unwrap()
                    .strip_suffix("]").unwrap()
                    .parse().unwrap();
                let value = data.next().unwrap().parse().unwrap();

                Ok(Instruction::Mem((location, value)))
            },
            None => Err(ParseInstructionError::InvalidArgs { details: s.to_string() })
        }
    }
}

fn main() {
    let instructions: Vec<Instruction> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    let mut mask = vec![];
    let mut memory: Vec<u64> = Vec::new();

    for instruction in instructions {
        match instruction {
            Instruction::Mask(m) => mask = m,
            Instruction::Mem((location, value)) => {
                if memory.len() <= location {
                    memory.resize(location + 1, 0)
                }
                memory[location] = mask.iter()
                    .fold(value, |num, (bit, ord)| match bit {
                        '0' => num & !ord,
                        '1' => num | ord,
                        _ => num
                    })
            }
        }
    }

    println!("{:#?}", memory.iter().sum::<u64>());
}

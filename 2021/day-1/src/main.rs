use std::io::{self, BufRead};

use day_1::{part1, part2};

fn main() {
    let numbers: Vec<usize> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line_result| line_result.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    println!("part 1: {:?}", part1(numbers.as_slice()));
    println!("part 2: {:?}", part2(numbers.as_slice()));
}

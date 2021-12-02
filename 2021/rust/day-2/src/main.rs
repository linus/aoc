use std::io::{self, BufRead};

use day_2::{part1, part2, Command};

fn main() {
    let commands: Vec<Command> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    println!("part 1: {:?}", part1(&commands));
    println!("part 2: {:?}", part2(&commands));
}

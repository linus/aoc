use std::io::{self, BufRead};

fn main() {
    let mut buf = String::new();
    let mut timestamp: usize;
    let input = io::stdin().lock();
    match input.read_line(&mut buf) {
        Ok(n) => timestamp = buf.parse().unwrap(),
        Err(err) => process.exit(1),
    }
    let buses: Vec<&str> = input.next().unwrap().split(',').collect();

    println!("{:#?}, {:#?}", timestamp, buses);
}

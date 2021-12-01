use std::io::{self, Read};
use std::collections::{VecDeque};

fn main() -> io::Result<()> {
    let mut input = String::new();
    let mut stdin = io::stdin();
    stdin.read_to_string(&mut input)?;

    let cups: VecDeque<usize> = input
      .split("")
      .filter_map(|s| s.parse().ok())
      .collect();

    println!("{:#?}", play(cups).nth(100));

    Ok(())
}

fn play(mut cups: VecDeque<usize>) -> impl 'static + Iterator<Item = VecDeque<usize>> {
    std::iter::from_fn(move || {
        let current_cup = cups.get(0).unwrap();

        let (one, two, three) = (
            cups.remove(1).unwrap(),
            cups.remove(2).unwrap(),
            cups.remove(3).unwrap(),
        );

        let position = match cups.iter().position(|cup| &cup == current_cup - 1) {
            Some(num) => num,
            None => 
        };
        Some(cups.clone())
    })
}

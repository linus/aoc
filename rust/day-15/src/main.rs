use std::io::{self};

fn main() {
    let mut buf = String::new();
    match io::stdin().read_line(&mut buf) {
        Ok(_) => println!("{}", memory_game(&parse_input(buf)).nth(30_000_000 - 1).unwrap()),
        Err(_) => {}
    }
}

fn parse_input(input: String) -> Vec<usize> {
    input.split(',').filter_map(|s| s.parse().ok()).collect()
}

fn memory_game(starting_numbers: &[usize]) -> impl '_ + Iterator<Item = usize> {
    let mut count = 0;
    let mut last = starting_numbers[0];
    let mut last_position = Vec::with_capacity(starting_numbers.len());

    std::iter::from_fn(move || {
         let num = if count < starting_numbers.len() {
             starting_numbers[count]
         } else {
            last_position
                .get(last)
                .map(|&pos| if pos == 0 { 0 } else { count - pos })
                .unwrap_or_default()
         };

         if last_position.len() <= num {
             last_position.resize(num + 1, 0);
         }

         last_position[last] = count;
         last = num;
         count += 1;

         Some(num)
    })
}

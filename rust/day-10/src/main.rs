use std::io::{self, BufRead};

fn main() {
    let mut numbers: Vec<usize> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line_result| line_result.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    numbers.sort();
    numbers.push(numbers[numbers.len() - 1] + 3);

    let mut bins = [0, 0, 0];
    let mut last = 0;

    for n in &numbers {
        let diff = n - last;
        if diff <= 3 { bins[diff - 1] += 1 }
        last = *n;
    }

    println!("{:#?}", bins[0] * bins[2]);

    fn find_jolts(numbers: &[usize]) -> usize {
        numbers
            .iter()
            .fold(0, |jolts, &n| {
                println!("{:?}", jolts);
                let result: usize = numbers
                    .iter()
                    .enumerate()
                    .take_while(|(_, &m)| n - m <= 3)
                    .map(|(j, _)| find_jolts(&numbers[j..]))
                    .sum();

                jolts + 1 + result
            })
    }
//    let result: usize = numbers
//        .iter()
//        .enumerate()
//        .map(|(i, &n)| numbers.iter().skip(i).take_while(|&m| m - n <= 3).count())
//        .product();

    numbers.reverse();
    println!("{:#?}", find_jolts(&numbers[..]));
}

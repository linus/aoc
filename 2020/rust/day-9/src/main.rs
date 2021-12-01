use std::env;
use std::cmp;
use std::io::{self, BufRead};

fn main() {
    let args: Vec<String> = env::args().collect();
    
    let preamble: usize = args[1].parse().unwrap();
    
    let numbers: Vec<i64> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line_result| line_result.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    let invalid = first(&numbers, preamble);

    println!("{:?}", invalid);

    println!("{:?}", second(numbers, invalid.unwrap()));

    fn second(numbers: Vec<i64>, needle: i64) -> Option<i64> {
        for (i, &n) in numbers.iter().enumerate() {
            let mut sum = n;
            let mut min = n;
            let mut max = n;

            for &m in numbers.iter().skip(i + 1) {
                sum += m;
                min = cmp::min(min, m);
                max = cmp::max(max, m);

                if sum == needle {
                    return Some(min + max)
                }

                if sum > needle {
                    break;
                }
            }
        }

        None
    }

    fn first(numbers: &Vec<i64>, preamble: usize) -> Option<i64> {
        for (i, &n) in numbers.iter().enumerate().skip(preamble) {
            let mut sums: Vec<i64> = Vec::new();

            for m in numbers.iter().skip(i - preamble) {
                for l in numbers.iter().skip(i - preamble + 1) {
                    sums.push(m + l);
                }
            }

            if !sums.iter().any(|&s| s == n) {
                return Some(n);
            }
        }

        None
    }
}

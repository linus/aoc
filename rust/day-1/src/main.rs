use std::io::{self, BufRead};

fn main() {
    let numbers: Vec<i32> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line_result| line_result.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    println!("{:?}", first(&numbers));
    println!("{:?}", second(&numbers));

    fn first(numbers: &Vec<i32>) -> Option<i32> {
        for (i, x) in numbers.iter().enumerate() {
            for y in numbers.iter().skip(i) {
                if x + y == 2020 {
                    return Some(x * y);
                }
            }
        }

        None
    }

    fn second(numbers: &Vec<i32>) -> Option<i32> {
        for (i, x) in numbers.iter().enumerate() {
            for (j, y) in numbers.iter().skip(i).enumerate() {
                for z in numbers.iter().skip(j) {
                    if x + y + z == 2020 {
                        return Some(x * y * z);
                    }
                }
            }
        }

        None
    }
}

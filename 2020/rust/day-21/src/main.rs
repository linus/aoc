use std::io::{self, BufRead};
use std::str::FromStr;

#[derive(Debug)]
struct Food<'a> {
    ingredients: Vec<&'a str>,
    allergens: Vec<&'a str>,
}

enum ParseFoodError {
}

impl FromStr for Food<'_> {
    type Err = ParseFoodError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let input = s.split("(contains ");
        let ingredients = input.next().unwrap().split(' ').collect();
        let allergens = match input.next() {
            Some(s) => s.split(')').next().unwrap().split(", ").collect(),
            None => vec![]
        };
        Ok(Food {
            ingredients,
            allergens
        })
    }
}

fn main() {
    let foods: Vec<Food> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    println!("{:#?}", foods);
}

use std::io::{self, BufRead};
use serde::Deserialize;
use recap::Recap;

#[derive(Debug, Deserialize, Recap)]
#[recap(regex = r#"(?x)
    ^
    (?P<min>\d+)
    -
    (?P<max>\d+)
    \s+
    (?P<letter>\w)
    :
    \s+
    (?P<password>.*)
    $
  "#)]
struct Rule {
    min: usize,
    max: usize,
    letter: char,
    password: String,
}

impl Rule {
    fn is_valid(&self) -> bool {
        let occurences = self.password.matches(self.letter).count();

        self.min <= occurences && occurences <= self.max
    }

    fn is_valid_pt_2(&self) -> bool {
        let p1 = self.password.chars().nth(self.min - 1).unwrap();
        let p2 = self.password.chars().nth(self.max - 1).unwrap();

        (p1 == self.letter) != (p2 == self.letter)
    }
}

fn main() {
    let foo: Vec<Rule> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .collect();

    let num_valid = foo
        .iter()
        .filter(|rule| rule.is_valid())
        .count();

    println!("{:?}", num_valid);

    let num_valid_pt2 = foo
        .iter()
        .filter(|rule| rule.is_valid_pt_2())
        .count();

    println!("{:?}", num_valid_pt2);
}

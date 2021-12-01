use std::io::{self, BufRead};
use std::num::ParseIntError;
use std::str::FromStr;

type Range = (usize, usize);

#[derive(Debug)]
struct Rule {
    name: String,
    ranges: (Range, Range),
}

trait Valid {
    fn validate(&self, n: usize) -> bool;
}

impl Valid for Rule {
    fn validate(&self, n: usize) -> bool {
        let (a, b) = &self.ranges;

        a.0 <= n && n <= a.1 || b.0 <= n && n <= b.1
    }
}

#[derive(Debug)]
enum ParseRuleError {
    InvalidArgs { details: String },
}

impl FromStr for Rule {
    type Err = ParseRuleError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let mut input = s.split(": ");

        match input.next() {
            Some("") => Err(ParseRuleError::InvalidArgs {
                details: "".to_string(),
            }),
            Some(str) => Ok(Rule {
                name: str.to_string(),
                ranges: Rule::parse(input.next().unwrap()).unwrap()
            }),
            _ => Err(ParseRuleError::InvalidArgs {
                details: "".to_string(),
            }),
        }
    }
}

impl Rule {
  fn parse(s: &str) -> Result<(Range, Range), ParseIntError> {
      let mut input = s.split(" or ");
      let mut left = input.next().unwrap().split("-");
      let mut right = input.next().unwrap().split("-");
  
      Ok((
          (left.next().unwrap().parse()?, left.next().unwrap().parse()?),
          (
              right.next().unwrap().parse()?,
              right.next().unwrap().parse()?,
          ),
      ))
  }
}

type Ticket = Vec<usize>;

trait Invalid {
    fn find_invalid(&self, rules: &Vec<Rule>) -> Option<&usize>;
}

impl Invalid for Ticket {
    fn find_invalid(&self, rules: &Vec<Rule>) -> Option<&usize> {
        self
            .iter()
            .find(|&x| !rules.iter().any(|r| r.validate(*x)))
    }
}

fn main() {
    let stdin = io::stdin();
    let mut lines = stdin.lock().lines();
    let mut rules: Vec<Rule> = Vec::new();

    while let Some(line) = lines.next() {
        match line.unwrap().parse() {
            Ok(rule) => rules.push(rule),
            Err(_) => break,
        }
    }

    lines.next(); // your ticket:
    let my_ticket: Ticket = lines
        .next()
        .unwrap()
        .unwrap()
        .split(",")
        .map(|s| s.parse().unwrap())
        .collect();

    lines.next(); // blank
    lines.next(); // nearby tickets:

    let mut nearby_tickets: Vec<Ticket> = Vec::new();

    while let Some(line) = lines.next() {
        nearby_tickets.push(
            line.unwrap()
                .split(",")
                .map(|s| s.parse().unwrap())
                .collect(),
        )
    }

    println!("Rules: {:#?} {:#?} {:#?}", rules, my_ticket, nearby_tickets);

    let invalid: Vec<&usize> = nearby_tickets
        .iter()
        .filter_map(|t| t.find_invalid(&rules))
        .collect();

    println!("Invalid numbers: {:#?}", invalid);

    let error_rate: usize = invalid.into_iter().sum();

    println!("Error rate: {:#?}", error_rate);
}

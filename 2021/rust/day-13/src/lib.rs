use std::collections::HashSet;
use recap::Recap;
use serde::Deserialize;

/// ```
/// # use day_13::{Dot};
/// // Valid dots are parsed correctly
/// let dot: Dot = "10,6".parse().unwrap();
/// ```
/// ```should_panic
/// # use day_13::{Dot};
/// // Invalid dots can not be parsed:
/// let dot: Dot = "fold along x=7".parse().unwrap();
/// ```
#[derive(Debug, Deserialize, Recap, Hash, PartialEq, Eq)]
#[recap(regex = r#"(?x)
    ^
    (?P<x>\d+)
    ,
    (?P<y>\d+)
    $
"#)]
pub struct Dot {
    x: usize,
    y: usize,
}

/// ```
/// # use day_13::{FoldInstruction};
/// // Valid fold instructions are parsed correctly
/// let fold_instruction: FoldInstruction = "fold along y=7".parse().unwrap();
/// ```
/// ```should_panic
/// # use day_13::{FoldInstruction};
/// // Invalid fold instructions can not be parsed:
/// let fold_instruction: FoldInstruction = "10,6".parse().unwrap();
/// ```
#[derive(Debug, Deserialize, Recap)]
#[recap(regex = r#"(?x)
    ^
    .*
    \s
    (?P<direction>\w)
    =
    (?P<line>\d+)
    $
"#)]
pub struct FoldInstruction {
    direction: Direction,
    line: usize,
}

#[derive(Debug, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
enum Direction {
    X,
    Y,
}

pub fn solution(dots: &mut [Dot], fold_instructions: &[FoldInstruction]) -> usize {
  for fold_instruction in fold_instructions.iter().take(1) {
    turn(dots, fold_instruction);
  }

  let part1: usize = HashSet::<&Dot>::from_iter(dots.iter()).len();

  for fold_instruction in fold_instructions.iter().skip(1) {
    turn(dots, fold_instruction);
  }

  println!("dots: {:?}", dots);
  print(dots);

  return part1;
}

fn turn(dots: &mut [Dot], fold_instruction: &FoldInstruction) {
  for mut dot in dots.into_iter().filter(|dot| if fold_instruction.direction == Direction::Y {
    dot.y > fold_instruction.line
  } else {
    dot.x > fold_instruction.line
  }) {
    if fold_instruction.direction == Direction::Y {
      dot.y = fold_instruction.line - (dot.y - fold_instruction.line)
    } else {
      dot.x = fold_instruction.line - (dot.x - fold_instruction.line)
    }
  }
}

fn print(dots: &[Dot]) {
  let width = dots.iter().max_by_key(|dot| dot.x).unwrap().x + 1;
  let height = dots.iter().max_by_key(|dot| dot.y).unwrap().y + 1;

  let mut grid = vec![vec!["."; width]; height];

  for dot in dots.into_iter() {
    grid[dot.y][dot.x] = "#";
  }

  println!("{}", grid.iter().map(|line| line.join("")).collect::<Vec<String>>().join("\n"));

}
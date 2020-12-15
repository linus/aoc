use std::io::{self, BufRead};
use serde::Deserialize;
use recap::Recap;

#[derive(Debug, Deserialize, Recap)]
#[recap(regex = r#"(?x)
    ^
    (?P<action>[NSEWRLF])
    (?P<value>\d+)
    $
  "#)]
struct Move {
    action: char,
    value: isize,
}

#[derive(Debug)]
struct Position(isize, isize, f64);

impl PartialEq for Position {
    fn eq(&self, other: &Self) -> bool {
        self.0 == other.0 && self.1 == other.1 && self.2 == other.2
    }
}

#[derive(Debug)]
struct SuperPosition((isize, isize), (isize, isize));

impl PartialEq for SuperPosition {
    fn eq(&self, other: &Self) -> bool {
        self.0 == other.0 && self.1 == other.1
    }
}

fn main() {
    let position: SuperPosition = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .filter_map(|line| line.parse().ok())
        .fold(SuperPosition((0, 0), (10, 1)), calculate_next_move_pt_ii);

    println!("{:#?}", position);
    let SuperPosition((x, y,), _) = position;
    println!("{:#?}", x.abs() + y.abs());
}

fn calculate_next_move(position: Position, mov: Move) -> Position {
    let Position(x, y, direction) = position;
    match mov {
        Move { action: 'N', value } => Position(x - value, y, direction),
        Move { action: 'S', value } => Position(x + value, y, direction),
        Move { action: 'E', value } => Position(x, y + value, direction),
        Move { action: 'W', value } => Position(x, y - value, direction),
        Move { action: 'L', value } => Position(x, y, ((direction - value as f64) + 360.0_f64) % 360.0_f64),
        Move { action: 'R', value } => Position(x, y, ((direction + value as f64) + 360.0_f64) % 360.0_f64),
        Move { action: 'F', value } => Position(
            x - (value as f64 * direction.to_radians().cos()) as isize,
            y + (value as f64 * direction.to_radians().sin()) as isize,
            direction,
        ),
        Move { .. } => Position(x, y, direction)
    }
}

fn calculate_next_move_pt_ii(position: SuperPosition, mov: Move) -> SuperPosition {
    println!("{:#?}, {:#?}", position, mov);
    let SuperPosition(
        (x, y),
        (wp_x, wp_y),
    ) = position;
    match mov {
        Move { action: 'N', value } => SuperPosition((x, y), (wp_x, wp_y + value)),
        Move { action: 'S', value } => SuperPosition((x, y), (wp_x, wp_y - value)),
        Move { action: 'E', value } => SuperPosition((x, y), (wp_x + value, wp_y)),
        Move { action: 'W', value } => SuperPosition((x, y), (wp_x - value, wp_y)),
        Move { action: 'R', value } => SuperPosition((x, y), rotate((wp_x, wp_y), (value as f64).to_radians())),
        Move { action: 'L', value } => SuperPosition((x, y), rotate((wp_x, wp_y), (360.0_f64 - value as f64).to_radians())),
        Move { action: 'F', value } => SuperPosition((x + wp_x * value, y + wp_y * value), (wp_x, wp_y)),
        Move { .. } => position,
    }
}

fn rotate(position: (isize, isize), angle: f64) -> (isize, isize) {
    let (x, y) = (position.0 as f64, position.1 as f64);

    (
        (x * angle.cos() + y * angle.sin()) as isize,
        (-x * angle.sin() + y * angle.cos()) as isize,
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn it_calculates_next_move() {
        assert_eq!(
            calculate_next_move( Position(0, 0, 0.0), Move { action: 'F', value: 5 }),
            Position(-5, 0, 0.0)
        );
        assert_eq!(
            calculate_next_move( Position(0, 0, 180.0), Move { action: 'F', value: 5 }),
            Position(5, 0, 180.0)
        );
    }

    #[test]
    fn it_calculates_the_actual_next_move() {
        assert_eq!(
            calculate_next_move_pt_ii(SuperPosition((0, 0), (-1, 10)), Move { action: 'F', value: 5 }),
            SuperPosition((-5, 50), (-1, 10))
        );
        assert_eq!(
            calculate_next_move_pt_ii(SuperPosition((0, 0), (-1, 10)), Move { action: 'F', value: 5 }),
            SuperPosition((-5, 50), (-1, 10))
        );
        assert_eq!(
            calculate_next_move_pt_ii(SuperPosition((0, 0), (-1, 10)), Move { action: 'R', value: 90 }),
            SuperPosition((0, 0), (10, 1))
        );
        assert_eq!(
            calculate_next_move_pt_ii(SuperPosition((0, 0), (10, 1)), Move { action: 'L', value: 90 }),
            SuperPosition((0, 0), (-1, 10))
        );
        assert_eq!(
            calculate_next_move_pt_ii(SuperPosition((0, 0), (10, 1)), Move { action: 'L', value: 180 }),
            SuperPosition((0, 0), (-10, -1))
        );
    }
}
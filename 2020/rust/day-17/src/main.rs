use std::io::{self, Read};
use std::fmt;
use std::str::FromStr;

#[derive(Debug)]
struct PocketDimension {
    grid: Grid,
}

type Cube = bool;
type Slice = Vec<Vec<Cube>>;
type Grid = Vec<Slice>;

impl FromStr for PocketDimension {
    type Err = io::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let slice: Slice = s.lines()
            .map(|line| { line.chars()
                    .map(|c| c == '#').collect()
            }).collect();

        let size = slice.len();
        let mut grid = vec![vec![vec![false; size]; size]; size];
        grid[0] = slice;

        Ok(PocketDimension { grid })
    }
}

impl fmt::Display for PocketDimension {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(f, "{}",
            self.grid.iter()
                .map(|slice| slice.iter()
                    .map(|row| row.iter()
                        .map( |&cube| if cube { "#" } else { "." }
                    ).collect::<Vec<&str>>().join("")
                ).collect::<Vec<String>>().join("\n")
            ).collect::<Vec<String>>().join("\n\n")
        )
    }
}

impl PocketDimension {
    fn active_neighbors(&self, (x, y, z): (usize, usize, usize)) -> usize {
        let neighbors = [
            self.grid[z - 1][y - 1][x - 1],self.grid[z - 1][y - 1][x],  self.grid[z - 1][y - 1][x + 1], 
            self.grid[z - 1][y - 1][x - 1],self.grid[z - 1][y - 1][x],  self.grid[z - 1][y - 1][x + 1], 
            self.grid[z - 1][y - 1][x - 1],self.grid[z - 1][y - 1][x],  self.grid[z - 1][y - 1][x + 1], 
        ];
        0
    }
}

fn main() -> io::Result<()> {
    let mut input = String::new();
    let mut stdin = io::stdin();
    stdin.read_to_string(&mut input)?;
    let dimension: PocketDimension = input.parse()?;
    println!("{}", dimension);
    Ok(())
}

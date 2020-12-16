use std::io::{self, BufRead};

fn main() {
    let map: Vec<Vec<char>> = io::stdin()
        .lock()
        .lines()
        .filter_map(|line| line.ok())
        .map(|line| line
            .split("")
            .filter_map(|num| num.parse().ok())
            .collect())
        .collect();

    let count_trees = |slope: &Vec<char>| slope.iter().filter(|&c| c == &'#').count();

    let result = count_trees(&traverse(&map, 3, 1));

    println!("{:#?}", result);

    let result2: usize = [
        traverse(&map, 1, 1),
        traverse(&map, 3, 1),
        traverse(&map, 5, 1),
        traverse(&map, 7, 1),
        traverse(&map, 1, 2),
    ]
        .iter()
        .map(count_trees)
        .product();

    println!("{:#?}", result2);

    fn traverse(map: &Vec<Vec<char>>, right: usize, down: usize) -> Vec<char> {
        let mut col = 0;

        map.iter().skip(1).step_by(down).fold(Vec::new(), |mut visited, row| {
            col += right;
            col %= row.len();

            visited.push(row[col]);

            visited
        })
    }
}

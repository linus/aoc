import { isCollinear } from './lib.js';

/**
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution(`
 * ............
 * ........0...
 * .....0......
 * .......0....
 * ....0.......
 * ......A.....
 * ............
 * ............
 * ........A...
 * .........A..
 * ............
 * ............
 * `)
 * //=> {
 *   part1: 14,
 *   part2: 34,
 * }
 */
export function solution(input) {
  const map = input
    .trim()
    .split('\n')
    .map((line) => line.split(''))
    .map((line, row) =>
      line.map((content, col) => ({
        row,
        col,
        content,
      })),
    );

  const antennae = Object.groupBy(
    map.flat().filter((cell) => cell.content !== '.'),
    (cell) => cell.content,
  );

  const pairs = Object.values(antennae).flatMap((frequencyAntennae) =>
    (frequencyAntennae ?? []).flatMap((antenna, index, arr) =>
      arr.slice(index + 1).map((other) => [antenna, other]),
    ),
  );

  const antinodes = pairs
    .flatMap(([a, b]) => [
      {
        row: a.row + a.row - b.row,
        col: a.col + a.col - b.col,
      },
      {
        row: b.row + b.row - a.row,
        col: b.col + b.col - a.col,
      },
    ])
    .filter(({ row, col }) => map[row]?.[col] ?? false);

  const resonantAntinodes = map
    .flat()
    .filter((cell) => pairs.some(([a, b]) => isCollinear(cell, a, b)));

  return {
    part1: new Set(antinodes.map(({ row, col }) => `${row},${col}`)).size,
    part2: new Set(resonantAntinodes.map(({ row, col }) => `${row},${col}`))
      .size,
  };
}

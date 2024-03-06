import { expand } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * ...#......
 * .......#..
 * #.........
 * ..........
 * ......#...
 * .#........
 * .........#
 * ..........
 * .......#..
 * #...#.....
 * `)
 * //=> {
 *   part1: 374,
 *   part2: 82000210
 * }
 */
export function solution(input) {
  const space = input
    .trim()
    .split('\n')
    .map((line, y) =>
      line
        .trim()
        .split('')
        .map((cell, x) => (cell === '.' ? 1 : { x, y }))
    );

  const galaxies = space.flat().filter((cell) => cell !== 1);

  const part1Space = expand(space, 2);
  const part2Space = expand(space, 1_000_000);

  function countDistancesInSpace(space, galaxies) {
    return galaxies.reduce((distances, { x, y }, index) => {
      let distance = 0;
      for (const other of galaxies.slice(index + 1)) {
        distance += space[y]
          .slice(Math.min(x, other.x), Math.max(x, other.x))
          .map((cell) => (typeof cell === 'number' ? cell : 1))
          .reduce((a, b) => a + b, 0);
        distance += space
          .map((row) => row[x])
          .slice(Math.min(y, other.y), Math.max(y, other.y))
          .map((cell) => (typeof cell === 'number' ? cell : 1))
          .reduce((a, b) => a + b, 0);
      }
      return distances + distance;
    }, 0);
  }

  return {
    part1: countDistancesInSpace(part1Space, galaxies),
    part2: countDistancesInSpace(part2Space, galaxies),
  };
}

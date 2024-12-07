import { detectLoop, placeObstacle, walk } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * ....#.....
 * .........#
 * ..........
 * ..#.......
 * .......#..
 * ..........
 * .#..^.....
 * ........#.
 * #.........
 * ......#...
 * `)
 * //=> {
 *   part1: 41,
 *   part2: 6,
 * }
 */
export function solution(input) {
  const map = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  const path = [...walk(map)];

  const visitedPositions = new Set(path.map(({ cell }) => cell));

  let loops = [...visitedPositions]
    .slice(1)
    .filter(({ row, col }) => detectLoop(placeObstacle(map, { row, col })));

  return {
    part1: visitedPositions.size,
    part2: loops.length,
  };
}

import { AStar, initializeNeighborhood, parseHeightMap } from './lib.js';

/**
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: undefined
 * }}
 * @example solution(`
 * Sabqponm
 * abcryxxl
 * accszExk
 * acctuvwj
 * abdefghi
 * `)
 * //=> {
 *   part1: 31,
 *   part2: 29
 * }
 */
export function solution(input) {
  const heightmap = parseHeightMap(
    input
      .trim()
      .split('\n')
      .map((row) => row.split(''))
  );

  const { start, end, lowPoints } = initializeNeighborhood(heightmap);

  const part1 = AStar(start, end);

  const part2 = lowPoints
    .map((p) => AStar(p, end))
    .filter((path) => typeof path !== 'undefined')
    // @ts-ignore
    .sort((a, b) => a.length - b.length)[0];

  return {
    // @ts-ignore
    part1: part1.length,
    // @ts-ignore
    part2: part2.length,
  };
}

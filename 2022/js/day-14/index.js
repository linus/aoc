import { buildMap, parseRock, pour } from './lib.js';

/**
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * 498,4 -> 498,6 -> 496,6
 * 503,4 -> 502,4 -> 502,9 -> 494,9
 * `)
 * //=> {
 *   part1: 24,
 *   part2: 93
 * }
 */
export function solution(input) {
  const map = buildMap(input.trim().split('\n').map(parseRock));

  return {
    part1: Array.from(pour(map)).length,
    part2: Array.from(pour(map.concat([[]]), true)).length,
  };
}

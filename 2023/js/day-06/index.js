import { transposeArray } from '../utils.js';
import { countWinningRaces } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * Time:      7  15   30
 * Distance:  9  40  200
 * `)
 * //=> {
 *   part1: 288,
 *   part2: 71503,
 * }
 */
export function solution(input) {
  const races = transposeArray(
    input
      .trim()
      .split('\n')
      .map((line) => line.split(/:\s+/).pop())
      .map((line) => line.split(/\s+/).map(Number))
  );

  return {
    part1: races.map(countWinningRaces).reduce((a, b) => a * b),
    part2: countWinningRaces(
      input
        .trim()
        .split('\n')
        .map((line) => line.split(/\s+/).slice(1).join(''))
        .map(Number)
    ),
  };
}

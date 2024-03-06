import { extrapolate as extrapolate } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * 0 3 6 9 12 15
 * 1 3 6 10 15 21
 * 10 13 16 21 30 45
 * `)
 * //=> {
 *   part1: 114,
 *   part2: 2
 * }
 */
export function solution(input) {
  const histories = input
    .trim()
    .split('\n')
    .map((line) => line.trim().split(' ').map(Number));

  const extrapolations = histories.map(extrapolate);

  return {
    part1: extrapolations.map(([_, after]) => after).reduce((a, b) => a + b),
    part2: extrapolations.map(([before, _]) => before).reduce((a, b) => a + b),
  };
}

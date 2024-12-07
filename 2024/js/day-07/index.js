import { test } from './lib.js';

/**
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution(`
 * 190: 10 19
 * 3267: 81 40 27
 * 83: 17 5
 * 156: 15 6
 * 7290: 6 8 6 15
 * 161011: 16 10 13
 * 192: 17 8 14
 * 21037: 9 7 18 13
 * 292: 11 6 16 20
 * `)
 * //=> {
 *   part1: 3749,
 *   part2: 11387,
 * }
 */
export function solution(input) {
  const equations = input
    .trim()
    .split('\n')
    .map((line) => line.split(/\s*:?\s+/).map(Number));

  return {
    part1: equations
      .filter(([result, ...numbers]) => test(result, numbers, false))
      .map(([result]) => result)
      .reduce((a, b) => a + b),
    part2: equations
      .filter(([result, ...numbers]) => test(result, numbers, true))
      .map(([result]) => result)
      .reduce((a, b) => a + b),
  };
}

import { add, concat, mul, test } from './lib.js';

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
  const equations = new Map(
    input
      .trim()
      .split('\n')
      .map((line) => {
        const [result, numbers] = line.split(/\s*:\s*/);
        return [Number(result), numbers.split(/\s+/).map(Number)];
      }),
  );

  const operations = {
    part1: [add, mul],
    part2: [add, mul, concat],
  };

  const [part1, part2] = Object.values(operations).map((operations) =>
    equations
      .entries()
      .filter(([result, numbers]) => test(result, numbers, operations))
      .map(([result]) => result)
      .reduce((a, b) => a + b),
  );

  return {
    part1,
    part2,
  };
}

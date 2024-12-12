import { blink as blink } from './lib.js';

/**
 * @param {string} input
 * @returns {{ part1: number, part2: number }}
 * @example solution('125 17')
 * //=> {
 *   part1: 55312,
 *   part2: 65601038650482,
 * }
 */
export function solution(input) {
  const stones = input.trim().split(' ');

  const part1 = stones.map((stone) => blink(stone, 25)).reduce((a, b) => a + b);
  const part2 = stones.map((stone) => blink(stone, 75)).reduce((a, b) => a + b);

  return {
    part1: part1,
    part2: part2,
  };
}

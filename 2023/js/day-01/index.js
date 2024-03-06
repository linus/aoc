import { findFirstAndLastNumber, findFirstAndLastNumberWord } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution(`
 * 1abc2
 * pqr3stu8vwx
 * a1b2c3d4e5f
 * treb7uchet
 * `)
 * //=> {
 *   part1: 142,
 *   part2: 142,
 * }
 * @example solution(`
 * two1nine
 * eightwothree
 * abcone2threexyz
 * xtwone3four
 * 4nineeightseven2
 * zoneight234
 * 7pqrstsixteen
 * `)
 * //=> {
 *  part1: 209,
 *  part2: 281,
 * }
 */
export function solution(input) {
  const lines = input.trim().split('\n');

  return {
    part1: lines.map(findFirstAndLastNumber).reduce((a, b) => a + b),
    part2: lines.map(findFirstAndLastNumberWord).reduce((a, b) => a + b),
  };
}

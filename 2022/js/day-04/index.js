import { parseLine, contains, overlaps } from './lib.js';
/**
 *
 * @param {string} input The list of section assignment pairs
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * 2-4,6-8
 * 2-3,4-5
 * 5-7,7-9
 * 2-8,3-7
 * 6-6,4-6
 * 2-6,4-8
 * `)
 * //=> {
 *   part1: 2,
 *   part2: 4
 * }
 */
export function solution(input) {
  const lines = input.trim().split('\n').map(parseLine);

  return {
    part1: lines.filter(contains).length,
    part2: lines.filter(overlaps).length,
  };
}

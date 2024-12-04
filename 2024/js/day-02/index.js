import { isSafe, dampenReport } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * 7 6 4 2 1
 * 1 2 7 8 9
 * 9 7 6 2 1
 * 1 3 2 4 5
 * 8 6 4 4 1
 * 1 3 6 7 9
 * `)
 * //=> {
 *   part1: 2,
 *   part2: 4,
 * }
 */
export function solution(input) {
  const reports = input
    .trim()
    .split('\n')
    .map((line) => line.split(/\s+/).map(Number));

  return {
    part1: reports.filter(isSafe).length,
    part2: reports.filter((report) => isSafe(report) || dampenReport(report).some(isSafe)).length,
  };
}

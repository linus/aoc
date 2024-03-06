import { transposeArray } from '../utils.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * #.##..##.
 * ..#.##.#.
 * ##......#
 * ##......#
 * ..#.##.#.
 * ..##..##.
 * #.#.##.#.
 *
 * #...##..#
 * #....#..#
 * ..##..###
 * #####.##.
 * #####.##.
 * ..##..###
 * #....#..#
 * `)
 * //=> {
 *   part1: 405,
 *   part2: 0
 * }
 */
export function solution(input) {
  const patterns = input
    .trim()
    .split('\n\n')
    .map((pattern) => pattern.split('\n'));

  const summarization = patterns.map((pattern) => {
    let multiplier = 100;
    let reflectionIndex = findReflection(pattern);
    if (reflectionIndex === -1) {
      multiplier = 1;
      reflectionIndex = findReflection(
        transposeArray(pattern.map((row) => row.split(''))).map((row) =>
          row.join('')
        )
      );
    }

    return multiplier * (reflectionIndex + 1);
  });

  return {
    part1: summarization.reduce((a, b) => a + b),
    part2: 0,
  };
}

/**
 * @param {string[]} rows
 * @returns {number}
 */
export function findReflection(rows) {
  return rows.findIndex((_, index) => {
    const reflection = rows.slice(index + 1, 2 * (index + 1));

    return (
      reflection.length > 0 &&
      reflection.every((row, i) => row === rows[index - i])
    );
  });
}

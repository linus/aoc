import { search } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * MMMSXXMASM
 * MSAMXMSMSA
 * AMXSXMAAMM
 * MSAMASMSMX
 * XMASAMXAMM
 * XXAMMXXAMA
 * SMSMSASXSS
 * SAXAMASAAA
 * MAMMMXMMMM
 * MXMXAXMASX
 * `)
 * //=> {
 *   part1: 18,
 *   part2: 9,
 * }
 */
export function solution(input) {
  const wordSearch = input
    .trim()
    .split('\n')
    .map((line) => line.split(''));

  // prettier-ignore
  const partPatterns = [
    [
      [
        ['X', 'M', 'A', 'S'],
      ],
      [
        ['S', 'A', 'M', 'X'],
      ],
      [
        ['X'],
        ['M'],
        ['A'],
        ['S'],
      ],
      [
        ['S'],
        ['A'],
        ['M'],
        ['X'],
      ],
      [
        ['X',   ,   ,   ,],
        [   ,'M',   ,   ,],
        [   ,   ,'A',   ,],
        [   ,   ,   ,'S',],
      ],
      [
        [   ,   ,   ,'X',],
        [   ,   ,'M',   ,],
        [   ,'A',   ,   ,],
        ['S',   ,   ,   ,],
      ],
      [
        ['S',   ,   ,   ,],
        [   ,'A',   ,   ,],
        [   ,   ,'M',   ,],
        [   ,   ,   ,'X',],
      ],
      [
        [   ,   ,   ,'S',],
        [   ,   ,'A',   ,],
        [   ,'M',   ,   ,],
        ['X',   ,   ,   ,],
      ],
    ],
    [
      [
        ['M',   ,'M',],
        [   ,'A',   ,],
        ['S',   ,'S',],
      ],
      [
        ['S',   ,'S',],
        [   ,'A',   ,],
        ['M',   ,'M',],
      ],
      [
        ['M',   ,'S',],
        [   ,'A',   ,],
        ['M',   ,'S',],
      ],
      [
        ['S',   ,'M',],
        [   ,'A',   ,],
        ['S',   ,'M',],
      ],
    ],
  ];

  const [part1, part2] = partPatterns.map((patterns) =>
    patterns
      .map((pattern) => search(wordSearch, pattern))
      .reduce((a, b) => a + b),
  );

  return {
    part1,
    part2,
  };
}

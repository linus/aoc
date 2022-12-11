import { parseMove, calculateScore, calculateMove } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * A Y
 * B X
 * C Z
 * `)
 * //=> {
 *   part1: 15,
 *   part2: 12
 * }
 */
export function solution(input) {
  const moves = input.trim().split('\n').map(parseMove);

  return {
    part1: moves.map(calculateScore).reduce((a, b) => a + b),
    part2: moves
      .map(calculateMove)
      .map(calculateScore)
      .reduce((a, b) => a + b),
  };
}

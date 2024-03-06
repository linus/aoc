import { parseCard } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *  part1: number,
 *  part2: number
 * }}
 * @example solution(`
 * Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
 * Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
 * Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
 * Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
 * Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
 * Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
 * `)
 * //=> {
 *   part1: 13,
 *   part2: 30,
 * }
 */
export function solution(input) {
  const cards = input.trim().split('\n').map(parseCard);

  const points = cards.map(
    ({ winning, numbers }) =>
      numbers.filter((number) => winning.includes(number)).length
  );

  /** @type {number[]} */
  const wonCards = [];
  for (const point of points.reverse()) {
    wonCards.push(
      point > 0 ? wonCards.slice(-point).reduce((a, b) => a + b, 1) : 1
    );
  }

  return {
    part1: points
      .map((point) => (point > 0 ? 2 ** (point - 1) : 0))
      .reduce((a, b) => a + b),
    part2: wonCards.reduce((a, b) => a + b),
  };
}

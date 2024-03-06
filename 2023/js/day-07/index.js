import { rankHands } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * 32T3K 765
 * T55J5 684
 * KK677 28
 * KTJJT 220
 * QQQJA 483
 * `)
 * //=> {
 *   part1: 6440,
 *   part2: 5905,
 * }
 */
export function solution(input) {
  const hands = input
    .trim()
    .split('\n')
    .map((line) => line.split(' '))
    .map(([hand, bid]) => [hand, Number(bid)]);

  return {
    part1: hands
      .sort(([handA], [handB]) => rankHands(handA, handB))
      .map(([_, bid]) => bid)
      .reduce((winnings, bid, index) => winnings + bid * (index + 1), 0),
    part2: hands
      .sort(([handA], [handB]) => rankHands(handA, handB, true))
      .map(([_, bid]) => bid)
      .reduce((winnings, bid, index) => winnings + bid * (index + 1), 0),
  };
}

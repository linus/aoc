import { parseInput } from './lib.js';

/**
 * @param {string} input
 */
export function solution(input) {
  const { crates, moves } = parseInput(input);

  const cratesCopy = crates.map((crate) => crate.slice());
  for (let { num, from, to } of moves) {
    while (num-- > 0) {
      // @ts-ignore
      cratesCopy[to - 1].push(cratesCopy[from - 1].pop());
    }
  }

  const part1 = cratesCopy
    .map((crate) => crate.reverse())
    .map(([first]) => first)
    .join('');

  for (const { num, from, to } of moves) {
    crates[to - 1].push(...crates[from - 1].splice(-num));
  }

  const part2 = crates
    .map((crate) => crate.reverse())
    .map(([first]) => first)
    .join('');

  return {
    part1,
    part2,
  };
}

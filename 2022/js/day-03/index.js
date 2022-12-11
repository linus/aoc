import { chunkArray } from '../utils.js';
import { parseLine, parseContents, findCommon, getPriority } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 */
export function solution(input) {
  let lines = input.split('\n').map(parseLine);

  const part1 = lines
    .map(parseContents)
    .map(findCommon)
    // @ts-ignore
    .map(getPriority)
    .reduce((a, b) => a + b);

  const part2 = Array.from(chunkArray(lines, 3))
    .map(findCommon)
    // @ts-ignore
    .map(getPriority)
    .reduce((a, b) => a + b);

  return {
    part1,
    part2,
  };
}

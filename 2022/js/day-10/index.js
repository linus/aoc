import { sign } from 'crypto';
import { cpuIterator, parseInstruction } from './lib.js';

/**
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: string
 * }}
 * @example fs
 *   .readFile('../input/day-10.example', 'utf8')
 *   .then((input) => solution(input))
 * //=> {
 *   part1: 13140,
 *   part2: `
 * ##..##..##..##..##..##..##..##..##..##..
 * ###...###...###...###...###...###...###.
 * ####....####....####....####....####....
 * #####.....#####.....#####.....#####.....
 * ######......######......######......####
 * #######.......#######.......#######.....
 * `
 * }
 */
export function solution(input) {
  const instructions = input.trim().split('\n').map(parseInstruction);
  let signalStrengths = [];
  let state;
  /** @type {string[][]} */
  let crt = [[]];

  for (let cycle = 1, cpu = cpuIterator(instructions); !state?.done; cycle++) {
    state = cpu.next();
    if (!state.value) continue; // To please TS
    let position = (cycle - 1) % 40;
    let pixel =
      state.value - 1 <= position && position <= state.value + 1 ? '#' : '.';
    crt[crt.length - 1].push(pixel);
    if (cycle % 40 === 20) {
      signalStrengths.push(cycle * state.value);
    }
    if (cycle % 40 === 0) {
      crt.push([]);
    }
  }

  return {
    part1: signalStrengths.reduce((a, b) => a + b),
    part2:
      '\n' +
      crt
        .slice(0, -1)
        .map((row) => row.join(''))
        .join('\n') +
      '\n',
  };
}

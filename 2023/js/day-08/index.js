import { eternalInstructions, lcm } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * RL
 *
 * AAA = (BBB, CCC)
 * BBB = (DDD, EEE)
 * CCC = (ZZZ, GGG)
 * DDD = (DDD, DDD)
 * EEE = (EEE, EEE)
 * GGG = (GGG, GGG)
 * ZZZ = (ZZZ, ZZZ)
 * `)
 * //=> {
 *   part1: 2,
 *   part2: 2,
 * }
 * @example solution(`
 * LLR
 *
 * AAA = (BBB, BBB)
 * BBB = (AAA, ZZZ)
 * ZZZ = (ZZZ, ZZZ)
 * `)
 * //=> {
 *   part1: 6,
 *   part2: 6,
 * }
 * @example solution(`
 * LR
 *
 * 11A = (11B, XXX)
 * 11B = (XXX, 11Z)
 * 11Z = (11B, XXX)
 * 22A = (22B, XXX)
 * 22B = (22C, 22C)
 * 22C = (22Z, 22Z)
 * 22Z = (22B, 22B)
 * XXX = (XXX, XXX)
 * `)
 * //=> {
 *   part1: 2,
 *   part2: 6,
 * }

 */
export function solution(input) {
  const [instructionsInput, networkInput] = input.trim().split('\n\n');
  const network = Object.fromEntries(
    networkInput
      .trim()
      .split('\n')
      .map((line) => line.match(/(\w+) = \((\w+), (\w+)\)/))
      .map(([_, node, L, R ]) => [node, { L, R }])
  );

  let nodes = Object.keys(network).filter((node) => node.endsWith('A'));

  const steps = nodes.map((node) => {
    let i = 0;
    const instructions = eternalInstructions(instructionsInput);
    while (!node.endsWith('Z')) {
      node = network[node][instructions.next().value];
      i++;
    }
    return i;
  });

  return {
    part1: steps[0],
    part2: steps.reduce(lcm),
  };
}

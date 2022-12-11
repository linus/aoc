/**
 * @typedef Instruction
 * @type {{
 *   type: 'noop'
 * } | {
 *   type: 'addx',
 *   val: number
 * }}
 */
const instructionRE = /^(?<type>(noop|addx))\s*(?<val>-?\d+)?$/;

/**
 * @param {string} input
 * @returns Instruction
 * @example parseInstruction('noop')
 * //=> { type: 'noop' }
 * @example parseInstruction('addx 4')
 * //=> { type: 'addx', val: 4 }
 * @example parseInstruction('addx -3')
 * //=> { type: 'addx', val: -3 }
 */
export function parseInstruction(input) {
  // @ts-ignore
  const { type, val } = input.match(instructionRE)?.groups;

  return typeof val === 'undefined' ? { type } : { type, val: Number(val) };
}

/**
 * @param {Instruction[]} initialInstructions
 */
export function* cpuIterator(initialInstructions) {
  const instructions = structuredClone(initialInstructions);

  let X = 1;

  for (const instruction of instructions) {
    yield X;
    if (instruction.type === 'addx') {
      yield X;
      X += instruction.val;
    }
  }
}

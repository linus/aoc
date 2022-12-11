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
 * @yields {number}
 * @example cpuIterator([{ type: 'addx', val: 4 }]).next()
 * //=> { value: 1, done: false }
 * @example const it = cpuIterator([{ type: 'addx', val: 4 }]); it.next(); it.next()
 * //=> { value: 1, done: false }
 * @example const it = cpuIterator([
 *   { type: 'addx', val: 4 },
 *   { type: 'noop' }
 * ]);
 * it.next();
 * it.next();
 * it.next()
 * //=> { value: 5, done: false }
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

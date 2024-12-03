/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
 * `)
 * //=> {
 *   part1: 161,
 *   part2: 161,
 * }
 * @example solution(`
 * mul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
 * `)
 * //=> {
 *   part1: 161,
 *   part2: 48,
 * }
 */
export function solution(input) {
  const memory = input.trim();
  const re = /mul\((\d+),(\d+)\)/g;
  
  let instruction;
  let result = 0;
  while (instruction = re.exec(memory)) {
    const [_, a, b] = instruction;
    result += Number(a) * Number(b);
  }

  let enabled = true;
  let result2 = 0;
  const re2 = /(mul|don't|do)\((?:(\d+),(\d+))?\)/g;
  while (instruction = re2.exec(memory)) {
    const [_, operation, a, b] = instruction;
    switch (operation) {
      case 'don\'t':
        enabled = false;
        break;
      case 'do':
        enabled = true;
        break;
      case 'mul':
        if (enabled) {
          result2 += Number(a) * Number(b);
        }
        break;
    }
  }

  return {
    part1: result,
    part2: result2,
  };
}

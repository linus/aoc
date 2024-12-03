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
  const re = /(mul|don't|do)\((?:(\d+),(\d+))?\)/g;
  
  let part1 = 0;
  let part2 = 0;

  let enabled = true;

  for (const [_, operation, a, b] of memory.matchAll(re)) {
    switch (operation) {
      case 'don\'t':
        enabled = false;
        break;
      case 'do':
        enabled = true;
        break;
      case 'mul':
        part1 += Number(a) * Number(b);
        if (enabled) {
          part2 += Number(a) * Number(b);
        }
        break;
    }
  }

  return {
    part1,
    part2,
  };
}

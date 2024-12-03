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
  const { part1, part2 } = input
    .trim()
    .matchAll(/(mul|don't|do)\((?:(\d+),(\d+))?\)/g)
    .reduce(
      ({ enabled, part1, part2 }, [_, operation, a, b]) =>
        operation === "don't"
          ? { enabled: false, part1, part2 }
          : operation === 'do'
            ? { enabled: true, part1, part2 }
            : {
                enabled,
                part1: part1 + Number(a) * Number(b),
                part2: enabled ? part2 + Number(a) * Number(b) : part2,
              },
      { enabled: true, part1: 0, part2: 0 },
    );

  return {
    part1,
    part2,
  };
}

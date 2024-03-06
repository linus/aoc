/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * 467..114..
 * ...*......
 * ..35..633.
 * ......#...
 * 617*......
 * .....+.58.
 * ..592.....
 * ......755.
 * ...$.*....
 * .664.598..
 * `)
 * //=> {
 *   part1: 4361,
 *   part2: undefined
 * }
 */
export function solution(input) {
  const lines = input.trim().split('\n');
  const re = /(?:\d+|[^\.])/g;

  const partNumbers = lines.flatMap((line, y) => {
    const numbers = [];
    let match;
    while ((match = re.exec(line))) {
      const from = Math.max(0, match.index - 1);
      const to = Math.min(line.length - 1, match.index + match[0].length + 1);

      let neighbors = '';
      if (y > 0) {
        neighbors += lines[y - 1].slice(from, to);
      }
      if (y < lines.length - 1) {
        neighbors += lines[y + 1].slice(from, to);
      }
      if (match.index > 0) {
        neighbors += line[from];
      }
      if (match.index + match[0].length <= line.length - 1) {
        neighbors += line[match.index + match[0].length];
      }

      if (neighbors.match(/[^.\d]/)) {
        numbers.push(Number(match[0]));
      }
    }

    return numbers;
  });

  const cells = lines.map((line) => line.split(''));
  const gears = cells.flatMap((line, y) =>
    line.filter((cell) => cell === '*').map((_, x) => ({ x, y }))
  );

  return {
    part1: partNumbers.reduce((a, b) => a + b),
    part2: undefined,
  };
}

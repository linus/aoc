/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution(`
 * 3   4
 * 4   3
 * 2   5
 * 1   3
 * 3   9
 * 3   3
 * `)
 * //=> {
 *   part1: 11,
 *   part2: 31,
 * }
 */
export function solution(input) {
  const lines = input.trim().split('\n');
  const left = [],
    right = [];
  for (const line of lines) {
    const [l, r] = line.split(/\s+/);
    left.push(Number(l));
    right.push(Number(r));
  }
  left.sort();
  right.sort();

  const diffs = left.map((l, i) => Math.abs(l - right[i]));

  const freqs = right.reduce((acc, num) => {
    acc[num] = (acc[num] || 0) + 1;
    return acc;
  }, {});

  const similarities = left.map((l) => l * freqs[l] || 0);

  return {
    part1: diffs.reduce((a, b) => a + b),
    part2: similarities.reduce((a, b) => a + b),
  };
}

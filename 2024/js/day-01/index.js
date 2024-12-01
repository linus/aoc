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
  /** @type {number[][]} */
  const [left, right] = input
    .trim()
    .split('\n')
    .map((line) => line.split(/\s+/).map(Number))
    .reduce(
      ([left, right], [l, r]) => {
        left.push(l);
        right.push(r);
        return [left, right];
      },
      /** @type {number[][]} */ [[], []]
    )
    .map((arr) => arr.sort());

  const diffs = left.map((l, i) => Math.abs(l - right[i]));

  const freqs = right.reduce(
    (freqs, num) => {
      freqs[num] = (freqs[num] || 0) + 1;
      return freqs;
    },
    /** @type {Record<number, number>} */ {}
  );

  const similarities = left.map((l) => l * (freqs[l] ?? 0));

  return {
    part1: diffs.reduce((a, b) => a + b),
    part2: similarities.reduce((a, b) => a + b),
  };
}

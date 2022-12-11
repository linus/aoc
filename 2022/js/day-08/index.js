import { findNumShorter } from './lib.js';
/**
 * @param {string} input
 * @example solution(`
 * 30373
 * 25512
 * 65332
 * 33549
 * 35390
 * `)
 * //=> {
 *   part1: 21,
 *   part2: 8
 * }
 */
export function solution(input) {
  const trees = input
    .trim()
    .split('\n')
    .map((row) => row.split('').map((tree) => Number(tree)));

  let numVisible = 0;
  let scenicScores = [];

  for (const [rowIndex, row] of trees.entries()) {
    for (const [colIndex, tree] of row.entries()) {
      const col = trees.map((row) => row[colIndex]);

      const before = row.slice(0, colIndex);
      const after = row.slice(colIndex + 1);
      const above = col.slice(0, rowIndex);
      const below = col.slice(rowIndex + 1);

      if (
        before.every((t) => t < tree) ||
        after.every((t) => t < tree) ||
        above.every((t) => t < tree) ||
        below.every((t) => t < tree)
      ) {
        numVisible += 1;
      }

      let scenicScore = 1;
      for (const direction of [
        before.reverse(),
        after,
        above.reverse(),
        below,
      ]) {
        const directionScore = findNumShorter(direction, tree);
        scenicScore *= directionScore;
      }
      scenicScores.push(scenicScore);
    }
  }

  return {
    part1: numVisible,
    part2: scenicScores.sort((a, b) => b - a)[0],
  };
}

/**
 * @param report {number[]}
 * @example isSafe([1, 2, 4, 6, 9]) //=> true
 * @example isSafe([1, 2, 4, 5, 9]) //=> false
 * @example isSafe([7, 6, 4, 2, 1]) //=> true
 */
export function isSafe(report) {
  return report.slice(0, -1).map((level, index) => level - report[index + 1])
    .every(
      (diff, index, diffs) => (diffs[index + 1] === undefined ||
        Math.sign(diff) === Math.sign(diffs[index + 1])) &&
        1 <= Math.abs(diff) &&
        Math.abs(diff) <= 3
    );
}

/**
 * @param report {number[]}
 * @example dampenReport([1, 2, 4])
 * //=> [[1, 2, 4], [2, 4], [1, 4], [1, 2]]
 * @example dampenReport([1, 7])
 * //=> [[1, 7], [7], [1]]
 */
export function dampenReport(report) {
  return report.reduce((subsets, _, index, array) => [
    ...subsets,
    [...array.slice(0, index), ...array.slice(index + 1)],
  ], [report]);
}

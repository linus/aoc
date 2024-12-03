/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * 7 6 4 2 1
 * 1 2 7 8 9
 * 9 7 6 2 1
 * 1 3 2 4 5
 * 8 6 4 4 1
 * 1 3 6 7 9
 * `)
 * //=> {
 *   part1: 2,
 *   part2: 4,
 * }
 */
export function solution(input) {
  const reports = input
    .trim()
    .split('\n')
    .map((line) => line.split(/\s+/).map(Number));

  return {
    part1: reports.filter(isSafe).length,
    part2: reports.filter((report) => dampenReport(report).some(isSafe)).length,
  };
}

/** @param report {number[]} */
function isSafe(report) {
   return report.slice(0, -1).map((level, index) => level - report[index + 1])
    .every(
      (diff, index, diffs) =>
        (diffs[index + 1] === undefined ||
          Math.sign(diff) === Math.sign(diffs[index + 1])) &&
        1 <= Math.abs(diff) &&
        Math.abs(diff) <= 3
    );
}

/** @param report {number[]} */
function dampenReport(report) {
  return report.reduce((permutations, _, index, array) => [
    ...permutations,
    [...array.slice(0, index), ...array.slice(index + 1)],
  ], [report]);
}

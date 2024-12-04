/**
 * @typedef {number[]} Report
 */

/**
 * @param report {Report}
 * @returns {boolean} Whether the report is safe
 * @example isSafe([1, 2, 4, 6, 9]) //=> true
 * @example isSafe([1, 2, 4, 5, 9]) //=> false
 * @example isSafe([7, 6, 4, 2, 1]) //=> true
 */
export function isSafe(report) {
  // prettier-ignore
  return report
    .slice(0, -1)
    .map((level, index) => level - report[index + 1])         // Calculate the differences between each level
    .every(                                                   //   For each difference, ensure that
      (diff, index, diffs) =>
        (diffs[index + 1] === undefined ||                    //     if there is a next difference
          Math.sign(diff) === Math.sign(diffs[index + 1])) && //       the signs are the same, and
        1 <= Math.abs(diff) &&                                //     the difference is within
        Math.abs(diff) <= 3,                                  //       reasonable bounds
    );
}

/**
 * @param report {Report}
 * @returns {Report[]} A list of dampened reports, one for each level removed
 * @example dampenReport([1, 2, 4])
 * //=> [[2, 4], [1, 4], [1, 2]]
 * @example dampenReport([1, 7])
 * //=> [[7], [1]]
 */
export function dampenReport(report) {
  // prettier-ignore
  return report.reduce(
    (dampenedReports, _, index, array) => [                  // For each level in the report
      ...dampenedReports,                                    //   return the accumulated dampened reports
      [...array.slice(0, index), ...array.slice(index + 1)], //   and the report without the current level
    ],
    /** @type {Report[]} */ ([]),
  );
}

/**
 * @param {number} result -- The expected result
 * @param {number[]} numbers -- The list of numbers
 * @param {boolean=} usingConcat -- Whether to use the concat operation
 * @returns {boolean}
 * @example test(190, [10, 19])
 * //=> true
 * @example test(192, [17, 8, 14])
 * //=> false
 * @example test(3267, [81, 40, 27])
 * //=> true
 * @example test(7290, [6, 8, 6, 15])
 * //=> false
 * @example test(7290, [6, 8, 6, 15], true)
 * //=> true
 * @example test(156, [15, 6], true)
 * //=> true
 */
export function test(result, [acc, ...numbers], usingConcat = false) {
  return acc > result
    ? false
    : numbers.length === 0
      ? acc === result
      : test(result, [acc + numbers[0], ...numbers.slice(1)], usingConcat) ||
        test(result, [acc * numbers[0], ...numbers.slice(1)], usingConcat) ||
        (usingConcat &&
          test(
            result,
            [concat(acc, numbers[0]), ...numbers.slice(1)],
            usingConcat,
          ));
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The two numbers, concatenated
 * @example concat(17, 4711)
 * //=> 174711
 */
export function concat(a, b) {
  return a * 10 ** Math.floor(Math.log10(b) + 1) + b;
}

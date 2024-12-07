/**
 * @param {number} result -- The expected result
 * @param {number[]} numbers -- The list of numbers
 * @param {Array<Function>} operations -- Valid operations
 * @returns {boolean}
 * @example test(190, [10, 19], [add, mul])
 * //=> true
 * @example test(192, [17, 8, 14], [add, mul])
 * //=> false
 * @example test(3267, [81, 40, 27], [add, mul])
 * //=> true
 * @example test(7290, [6, 8, 6, 15], [add, mul])
 * //=> false
 * @example test(7290, [6, 8, 6, 15], [add, mul, concat])
 * //=> true
 * @example test(156, [15, 6], [add, mul, concat])
 * //=> true
 */
export function test(result, [acc, ...numbers], operations) {
  return acc > result
    ? false
    : numbers.length === 0
      ? acc === result
      : operations.some((operation) =>
          test(
            result,
            [operation(acc, numbers[0]), ...numbers.slice(1)],
            operations,
          ),
        );
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The sum of the two numbers
 * @example add(17, 4711)
 * //=> 4728
 */
export function add(a, b) {
  return a + b;
}

/**
 * @param {number} a
 * @param {number} b
 * @returns {number} The product of the two numbers
 * @example mul(17, 4711)
 * //=> 80087
 */
export function mul(a, b) {
  return a * b;
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

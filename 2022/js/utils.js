/**
 *
 * @template T
 * @param {T[]} array
 * @param {number} chunkSize
 * @yields {T[][]}
 * @example chunkArray([1, 2, 3, 4], 2).next()
 * //=> {
 *   value: [1, 2],
 *   done: false,
 * }
 * @example Array.from(chunkArray([17, 4711], 1))
 * //=> [
 *   [17],
 *   [4711],
 * ]
 */
export function* chunkArray(array, chunkSize) {
  for (let i = 0, l = array.length; i < l; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    yield chunk;
  }
}

/**
 * Transpose an array.
 *
 * @template T
 * @param {T[][]} array the array to transpose
 * @returns {T[][]} the transposed array
 * @example transposeArray([
 *   [1, 2],
 *   [3, 4],
 * ])
 * //=> [
 *   [1, 3],
 *   [2, 4],
 * ]
 * @example transposeArray([
 *   ['a', 'b', 'c'],
 *   ['d', 'e', 'f'],
 * ])
 * //=> [
 *   ['a', 'd'],
 *   ['b', 'e'],
 *   ['c', 'f'],
 * ]
 */
export function transposeArray(array) {
  return array[0].map((_, colIndex) => array.map((row) => row[colIndex]));
}

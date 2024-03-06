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

/**
 * @param {number} from
 * @param {number} to
 * @returns {number[]}
 * @example range(7, 17)
 * //=> [7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
 * @example range(10, 2)
 * //=> [10, 9, 8, 7, 6, 5, 4, 3]
 */
export function range(from, to) {
  const step = from < to ? 1 : -1;
  return Array.from({ length: Math.abs(to - from) }, (_, i) => from + i * step);
}

/**
 * @template T
 * @param {T[]} items
 * @param {Object.<T, number>?} initialCount
 * @returns {Object.<T, number>}
 * @example countItems([1, 2, 3, 1, 2, 1])
 * //=> { 1: 3, 2: 2, 3: 1 }
 */
export function countItems(items, initialCount = {}) {
  return items.reduce((count, item) => {
    count[item] = (count[item] || 0) + 1;
    return count;
  }, initialCount);
}

/**
 *
 * @param {number[]} array
 * @param {number} n
 * @returns {number}
 * @example findNumShorter([3], 5)
 * //=> 1
 * @example findNumShorter([5, 2], 5)
 * //=> 1
 */
export function findNumShorter(array, n) {
  for (let i = 0, l = array.length; i < l; i++) {
    if (array[i] >= n) return i + 1;
  }
  return array.length;
}

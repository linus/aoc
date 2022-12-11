/**
 * Find the first occurrence of n unique characters in input string
 *
 * @param {string} input The input string
 * @param {number} n The number of consecutive unique characters to find
 * @returns {number | undefined} The index of the end of n consecutive unique characters
 * @example findUnique('abababcb', 3)
 * //=> 7
 */
export function findUnique(input, n) {
  for (let i = 0, l = input.length; i < l - n; i++) {
    const chars = input.slice(i, i + n);
    if (new Set(chars).size === chars.length) {
      return i + n;
    }
  }
}

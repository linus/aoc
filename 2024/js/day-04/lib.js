/**
 * Find a needle in a haystack, where the needle and haystack are both 2D arrays
 *
 * @template T
 * @param {Array<Array<T>>} haystack
 * @param {Array<Array<T | undefined>>} needle
 * @returns {number} The number of times the needle appears in the haystack
 * @example search(`
 * MMMSXXMASM
 * MSAMXMSMSA
 * AMXSXMAAMM
 * MSAMASMSMX
 * XMASAMXAMM
 * XXAMMXXAMA
 * SMSMSASXSS
 * SAXAMASAAA
 * MAMMMXMMMM
 * MXMXAXMASX
 * `.trim().split('\n').map(line => line.split('')),
 * [['X', 'M', 'A', 'S']])
 * //=> 3
 */
export function search(haystack, needle) {
  const n = needle.length;
  const m = needle[0].length;
  const rows = haystack.length;
  const cols = haystack[0].length;
  let count = 0;

  for (let i = 0; i <= rows - n; i++) {
    cols: for (let j = 0; j <= cols - m; j++) {
      for (let k = 0; k < n; k++) {
        for (let l = 0; l < m; l++) {
          if (
            needle[k][l] !== undefined &&
            needle[k][l] !== haystack[i + k][j + l]
          ) {
            continue cols;
          }
        }
      }
      count++;
    }
  }

  return count;
}

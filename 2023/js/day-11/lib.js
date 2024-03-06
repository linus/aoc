import { transposeArray } from '../utils.js';

/**
 * @param {Array<Array<any | number>>} space
 * @param {number} expansion
 * @returns {Array<Array<any | number>>}
 * @example expand([
 *   [ 1,  1, '#'],
 *   [ 1,  1,  1 ],
 *   ['#', 1,  1 ],
 *   [ 1,  1,  1 ],
 * ], 2)
 * //=> [
 *   [ 1,  2, '#'],
 *   [ 2,  2,  2 ],
 *   ['#', 2,  1 ],
 *   [ 2,  2,  2 ],
 * ]
 */
export function expand(space, expansion) {
  return transposeArray(
    expandRows(transposeArray(expandRows(space, expansion)), expansion)
  );
}

/**
 * @param {Array<Array<any | number>>} space
 * @param {number} expansion
 * @returns {Array<Array<any | number>>}
 * @example expandRows([
 *   [ 1,  1, '#'],
 *   [ 1,  1,  1 ],
 *   ['#', 1,  1 ]
 * ], 2)
 * //=> [
 *   [ 1,  1, '#'],
 *   [ 2,  2,  2 ],
 *   ['#', 1,  1 ]
 * ]
 */
export function expandRows(space, expansion) {
  return space.map((row) =>
    row.every((cell) => typeof cell === 'number') ? row.fill(expansion) : row
  );
}

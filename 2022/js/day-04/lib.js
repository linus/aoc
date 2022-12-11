/**
 * JSDoc cannot parse TypeScript types, so let's use this trick:
 * https://github.com/jsdoc/jsdoc/issues/1073#issuecomment-167204327
 *
 * @typedef Assignment
 * @type {number[]}
 * @ts-ignore
 * @property {number} 0 - From
 * @property {number} 1 - To
 * @property {2} length - Tuple size
 *
 * @typedef Pair
 * @type {Assignment[]}
 * @ts-ignore
 * @property {Assignment} 0 - From
 * @property {Assignment} 1 - To
 * @property {2} length - Tuple size
 */

/**
 * Parse a line into pairs of assignments with from - to bounds
 *
 * @param {string} line
 * @returns {Pair} The pair of assignments
 * @example parseLine('1-2,3-4')
 * //=> [[1, 2], [3, 4]]
 */
export function parseLine(line) {
  const [first, second] = line.split(',');

  return [parseSections(first), parseSections(second)];
}

/**
 * @param {string} definition
 * @returns {Assignment}
 */
function parseSections(definition) {
  const [from, to] = definition.split('-');
  return [Number(from), Number(to)];
}

/**
 * Check whether either pair contains the other or not
 *
 * @param {Pair} param0 The two pairs
 * @returns {boolean} Whether either pair contains the other or not
 * @example contains([[1, 2], [3, 4]])
 * //=> false
 * @example contains([[1, 4], [2, 3]])
 * //=> true
 * @example contains([[2, 3], [1, 4]])
 * //=> true
 * @example contains([[1, 4], [1, 2]])
 * //=> true
 */
export function contains([[from1, to1], [from2, to2]]) {
  return (from1 <= from2 && to1 >= to2) || (from1 >= from2 && to1 <= to2);
}

/**
 * Check whether either pair overlaps the other or not
 *
 * @param {Pair} param0 The two pairs
 * @returns {boolean} Whether either pair overlaps the other or not
 * @example overlaps([[1, 2], [3, 4]])
 * //=> false
 * @example overlaps([[1, 2], [2, 3]])
 * //=> true
 * @example overlaps([[1, 4], [1, 2]])
 * //=> true
 * @example overlaps([[3, 4], [1, 3]])
 * //=> true
 */
export function overlaps([[from1, to1], [from2, to2]]) {
  return !((from1 < from2 && to1 < from2) || (from2 < from1 && to2 < from1));
}

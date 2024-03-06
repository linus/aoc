/**
 * @param {string} str
 * @returns {number}
 * @example hash('HASH')
 * //=> 52
 */
export function hash(str) {
  return str
    .split('')
    .reduce((hash, c) => ((hash + c.charCodeAt(0)) * 17) % 256, 0);
}

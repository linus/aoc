/**
 * @param {string} stone
 * @param {number} times
 * @returns {number}
 * @example _blink('125', 4)
 * //=> 3
 */
export function _blink(stone, times) {
  return times === 0
    ? 1
    : stone === '0'
      ? blink('1', times - 1)
      : stone.length % 2 === 0
        ? blink(stone.slice(0, stone.length / 2), times - 1) +
          blink(Number(stone.slice(stone.length / 2)).toString(), times - 1)
        : blink((Number(stone) * 2024).toString(), times - 1);
}

const memo = new Map();
const memoize =
  // @ts-ignore
  (fn) =>
    // @ts-ignore
    (...args) => {
      if (!memo.has(args.join(','))) memo.set(args.join(','), fn(...args));
      return memo.get(args.join(','));
    };

export const blink = memoize(_blink);

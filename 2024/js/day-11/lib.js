/**
 * @param {string} stone
 * @param {number} count
 * @returns {number}
 * @example _nextStep('125', 4)
 * //=> 3
 */
export function _nextStep(stone, count) {
  if (count === 0) return 1;

  return stone === '0'
    ? nextStep('1', count - 1)
    : stone.length % 2 === 0
      ? nextStep(stone.slice(0, stone.length / 2), count - 1) +
        nextStep(Number(stone.slice(stone.length / 2)).toString(), count - 1)
      : nextStep((Number(stone) * 2024).toString(), count - 1);
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

export const nextStep = memoize(_nextStep);

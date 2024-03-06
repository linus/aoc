/**
 *
 * @param {number[]} history
 * @returns {number[]}
 * @example extrapolate([0, 3, 6, 9, 12, 15])
 * //=> [-3, 18]
 * @example extrapolate([1, 3, 6, 10, 15, 21])
 * //=> [0, 28]
 * @example extrapolate([10, 13, 16, 21, 30, 45])
 * //=> [5, 68]
 */
export function extrapolate(history) {
  const differences = history
    .slice(1)
    .map((value, index) => value - history[index]);

  if (differences.every((val) => val === 0))
    return [history[0], history[history.length - 1]];

  const [before, after] = extrapolate(differences);
  return [history[0] - before, history[history.length - 1] + after];
}

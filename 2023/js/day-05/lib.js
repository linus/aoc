/**
 *
 * @param {string[]} input
 * @returns {number[]}
 * @example parseMap([
 * "50 98 2",
 * "52 50 48"
 * ])[55]
 * //=> 57
 */
export function parseMap(input) {
  const ranges = input.map((row) => row.split(/\s+/).map(Number));

  return new Proxy(ranges, { get: handler });
}

/**
 *
 * @param {number[][]} target
 * @param {number} prop
 * @returns {number}
 * @example handler([
 *   [50, 98, 2],
 *   [52, 50, 48]
 * ], 55)
 * //=> 57
 * @example handler([
 *   [50, 98, 2],
 *   [52, 50, 48]
 * ], 79)
 * //=> 81
 * @example handler([
 *   [50, 98, 2],
 *   [52, 50, 48]
 * ], 14)
 * //=> 14
 */
export function handler(target, prop) {
  const matchingRange = target.find(
    ([_, sourceRangeStart, rangeLength]) =>
      sourceRangeStart <= prop && prop < sourceRangeStart + rangeLength
  );
  if (matchingRange) {
    const [destinationRangeStart, sourceRangeStart] = matchingRange;
    return destinationRangeStart + (prop - sourceRangeStart);
  }
  return Number(prop);
}

/**
 * @param {number[]} depths
 * @param {(distance: number) => number} calculateCost
 * @returns {number | undefined}
 */
function fuelConsumption(depths, calculateCost) {
  const shallow = depths[0];
  const deep = depths[depths.length - 1];

  return range(shallow, deep)
    .map((depth) =>
      depths
        .map((targetDepth) => Math.abs(targetDepth - depth))
        .map(calculateCost)
        .reduce((sum, num) => sum + num)
    )
    .sort()
    .shift();
}

/**
 *
 * @param {string} input
 * @returns {{part1: number | undefined, part2: number | undefined}}
 * @example solution('16,1,2,0,4,2,7,1,2,14')
 * //=> {
 *   part1: 37,
 *   part2: 168,
 * }
 */
function solution(input) {
  const depths = input.split(',').map(Number).sort();

  const part1 = fuelConsumption(depths, (distance) => distance);
  const part2 = fuelConsumption(
    depths,
    (distance) => (distance * (distance + 1)) / 2
  );

  return {
    part1,
    part2,
  };
}

/**
 * @param {number} start
 * @param {number} stop
 */
function range(start, stop) {
  return Array.from({ length: stop - start }).map((_, i) => start + i);
}

module.exports = {
  solution,
};

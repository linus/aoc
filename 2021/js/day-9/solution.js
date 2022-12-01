/**
 * @param {string} input
 * @returns {{part1: number}}
 */
function solution(input) {
  const heightmap = input.split(/\n/).map((line) => line.split('').map(Number));

  /** @type {[number, boolean][]} */
  const lowPoints = heightmap
    .map((row, rowIndex) =>
      row.map((height, index) => [
        height,
        !neighbors(rowIndex, index).some((n) => n <= height),
      ])
    )
    .flatMap((row) => row)
    .filter(([, lowest]) => lowest);

  const part1 = lowPoints
    .map(([height]) => height + 1)
    .reduce((sum, num) => sum + num);

  return {
    part1,
  };

  /**
   * @param {number} rowIndex
   * @param {number} index
   * @returns {number[]}
   */
  function neighbors(rowIndex, index) {
    const neighbors = [
      heightmap[rowIndex][index - 1],
      heightmap[rowIndex][index + 1],
    ];
    if (heightmap[rowIndex - 1]) neighbors.push(heightmap[rowIndex - 1][index]);
    if (heightmap[rowIndex + 1]) neighbors.push(heightmap[rowIndex + 1][index]);

    return neighbors;
  }
}

module.exports = {
  solution,
};

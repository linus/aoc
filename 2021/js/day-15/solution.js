/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: null}}
 * @example solution(`1163751742
 * 1381373672
 * 2136511328
 * 3694931569
 * 7463417111
 * 1319128137
 * 1359912421
 * 3125421639
 * 1293138521
 * 2311944581`)
 * //=> {
 * part1: 40,
 * part2: null,
 * }
 */
function solution(input) {
  const riskLevelMap = input
    .trim()
    .split('\n')
    .map((row) => row.split(''))
    .map((row) => row.map(Number));

  return {
    part1: null,
    part2: null,
  };
}

function findPath(map, x, y, sum) {
  if (x === row.length - 1 && y === row[x].length - 1) {
    return sum + map[x][y];
  } else {
    
  }
}

module.exports = {
  solution,
};

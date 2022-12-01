/**
 * @typedef {[number, number]} Point
 * @typedef {[Point, Point]} Line
 * Parse a hydrothermal vent definiton
 * @param {string} input
 * @returns {Line | undefined}
 * @example parseDefinition("1,1 -> 1,3")
 * //=> [[1, 1], [1, 3]]
 * @example parseDefinition("9,7 -> 7,7")
 * //=> [[9, 7], [7, 7]]
 * @example parseDefinition("5,5 -> 8,2")
 * //=> [[5, 5], [8, 2]]
 */
function parseDefinition(input) {
  const match = input.match(/^(\d+),(\d+) -> (\d+),(\d+)$/);
  if (match) {
    const [x1, y1, x2, y2] = match.slice(1).map(Number);

    return [
      [x1, y1],
      [x2, y2],
    ];
  }
}

/**
 *
 * @param {Line[]} ventLines
 * @returns {{part1: number, part2: number}} The number of points where vent lines overlap
 * @example solution([
 *   [ [ 0, 9 ], [ 5, 9 ] ],
 *   [ [ 8, 0 ], [ 0, 8 ] ],
 *   [ [ 9, 4 ], [ 3, 4 ] ],
 *   [ [ 2, 2 ], [ 2, 1 ] ],
 *   [ [ 7, 0 ], [ 7, 4 ] ],
 *   [ [ 6, 4 ], [ 2, 0 ] ],
 *   [ [ 0, 9 ], [ 2, 9 ] ],
 *   [ [ 3, 4 ], [ 1, 4 ] ],
 *   [ [ 0, 0 ], [ 8, 8 ] ],
 *   [ [ 5, 5 ], [ 8, 2 ] ]
 * ])
//=> {
  part1: 5,
  part2: 12,
}
 */
function solution(ventLines) {
  const [straight, diagonal] = ventLines.reduce(findStraightAndDiagonal, [
    [],
    [],
  ]);
  const oceanFloor = findIntersections(straight);

  const part1 = oceanFloor
    .flatMap((row) => row)
    .filter((vents) => vents > 1).length;

  const part2 = findIntersections(diagonal, oceanFloor)
    .flatMap((row) => row)
    .filter((vents) => vents > 1).length;

  return {
    part1,
    part2,
  };
}

/**
 * @param {[Line[], Line[]]} param0
 * @param {Line} line
 * @returns {[Line[], Line[]]}
 */
function findStraightAndDiagonal([straight, diagonal], line) {
  const [[x1, y1], [x2, y2]] = line;
  (x1 === x2 || y1 === y2 ? straight : diagonal).push(line);
  return [straight, diagonal];
}

/**
 * @param {Line[]} lines
 * @param {number[][]} oceanFloor
 * @returns {number[][]}
 */
function findIntersections(lines, oceanFloor = []) {
  return lines
    .flatMap((line) => [...points(line)])
    .reduce((oceanFloor, [x, y]) => {
      if (!oceanFloor[x]) oceanFloor[x] = [];
      oceanFloor[x][y] = (oceanFloor[x][y] || 0) + 1;

      return oceanFloor;
    }, oceanFloor);
}

/**
 * @param {Line} param0
 */
function* points([[x1, y1], [x2, y2]]) {
  let [x, y] = [x1, y1];
  let xIncrement = Math.sign(x2 - x1);
  let yIncrement = Math.sign(y2 - y1);

  yield [x, y];
  while (x !== x2 || y !== y2) {
    yield [(x = x += xIncrement), (y = y += yIncrement)];
  }
}

module.exports = {
  solution,
  parseDefinition,
};

/**
 * @typedef {{
 *   height: number,
 *   row: number,
 *   col: number,
 *   neighbors: Square[]
 * }} Square
 */

/**
 * @param {string[][]} heightmap
 * @returns {Square[][]}
 * @example parseHeightMap([
 *   ['S', 'a', 'b'],
 *   ['c', 'd', 'E']
 * ])
 * //=> [
 *   [
 *     {height: 96, row: 0, col: 0, neighbors: []},
 *     {height: 97, row: 0, col: 1, neighbors: []},
 *     {height: 98, row: 0, col: 2, neighbors: []}
 *   ],
 *   [
 *     {height: 99, row: 1, col: 0, neighbors: []},
 *     {height: 100, row: 1, col: 1, neighbors: []},
 *     {height: 123, row: 1, col: 2, neighbors: []}
 *   ]
 * ]
 */
export function parseHeightMap(heightmap) {
  return heightmap.map((row, rowIndex) =>
    row.map((square, index) => ({
      height: (square === 'S' ? '`' : square === 'E' ? '{' : square).charCodeAt(
        0
      ),
      row: rowIndex,
      col: index,
      neighbors: [],
    }))
  );
}

/**
 * @param {Square[][]} map
 * @returns {{
 *   start: Square,
 *   end: Square,
 *   lowPoints: Square[]
 * }}
 */
export function initializeNeighborhood(map) {
  let start,
    end,
    lowPoints = [];
  for (const [rowIndex, row] of map.entries()) {
    for (const [index, square] of row.entries()) {
      const neighbors = findNeighbors(map, rowIndex, index);
      for (const neighbor of neighbors) {
        if (!neighbor.neighbors.includes(square))
          neighbor.neighbors.push(square);
      }
      if (square.height === 96) start = square;
      if (square.height === 97) lowPoints.push(square);
      if (square.height == 123) end = square;
      else square.neighbors = neighbors;
    }
  }
  // @ts-ignore
  return { start, end, lowPoints };
}

/**
 * @template T
 * @param {T[][]} array
 * @param {number} row
 * @param {number} col
 * @returns {T[]}
 * @example findNeighbors([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 0, 0)
 * //=> [2, 4]
 * @example findNeighbors([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1, 1)
 * //=> [4, 6, 2, 8]
 * @example findNeighbors([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 2, 0)
 * //=> [8, 4]
 */
export function findNeighbors(array, row, col) {
  return [
    array[row][col - 1],
    array[row][col + 1],
    array[row - 1]?.[col],
    array[row + 1]?.[col],
  ].filter(Boolean);
}

/**
 * @param {Square} start
 * @param {Square} end
 * @returns {Square[] | undefined}
 */
export function AStar(start, end) {
  const queue = new Set([start]);
  /** @type {Map<Square, Square>} */
  const cameFrom = new Map();
  /** @type {Map<Square, number>} */
  const gScore = new Map();
  gScore.set(start, 0);
  /** @type {Map<Square, number>} */
  const fScore = new Map();
  fScore.set(start, 1);

  while (queue.size > 0) {
    const current = Array.from(queue.values())
      .map((square) => ({
        square,
        score: fScore.get(square) ?? Infinity,
      }))
      .sort(({ score: a }, { score: b }) => a - b)[0].square;

    if (current === end) {
      return unwind(cameFrom, current);
    }

    queue.delete(current);

    const neighbors = current.neighbors.filter(
      (neighbor) => neighbor.height - current.height <= 1
    );

    for (const neighbor of neighbors) {
      const score = (gScore.get(current) ?? Infinity) + 1;
      if (score < (gScore.get(neighbor) ?? Infinity)) {
        cameFrom.set(neighbor, current);
        gScore.set(neighbor, score);
        fScore.set(neighbor, score + 1);
        if (!queue.has(neighbor)) queue.add(neighbor);
      }
    }
  }
}

/**
 * @param {Map<Square, Square>} cameFrom
 * @param {Square} square
 * @returns {Square[]}
 */
export function unwind(cameFrom, square) {
  const path = [];
  let current = square;
  // @ts-ignore
  while ((current = cameFrom.get(current))) {
    path.push(current);
  }
  return path.reverse();
}

/**
 * Useful for debugging, to draw the map in a watch
 * @param {Square[]} path
 * @returns {String[]}
 */
export function format(path) {
  const grid = Array.from({ length: 41 }).map(() =>
    Array.from({ length: 162 }).fill('.')
  );
  for (const square of path) {
    grid[square.row][square.col] = String.fromCharCode(square.height);
  }

  return grid.map((row) => row.join(''));
}

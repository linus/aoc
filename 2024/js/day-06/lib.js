/**
 * @param {string[][]} map
 */
export function detectLoop(map) {
  const guardWalk = walk(map);

  let visited = new Set();

  for (
    let { done, value } = guardWalk.next();
    !done && value;
    { done, value } = guardWalk.next()
  ) {
    let {
      cell: { row, col },
      dy,
      dx,
    } = value;
    let key = `${row},${col},${dy},${dx}`;
    if (visited.has(key)) return true;
    visited.add(key);
  }

  return false;
}

/**
 * @param {string[][]} map
 * @yields {{
 *   cell: { row: number, col: number, content: string },
 *   dy: number,
 *   dx: number
 * }}
 * @example [...walk([
 *   ['#', '.', '.'],
 *   ['.', '^', '#'],
 *   ['#', '#', '.'],
 * ])]
 * //=> [
 *   { cell: { row: 1, col: 1, content: '^' }, dy: -1, dx: 0 },
 *   { cell: { row: 0, col: 1, content: '.' }, dy: -1, dx: 0 },
 * ]
 */
export function* walk(map) {
  let cells = map.map((line, row) =>
    line.map((content, col) => ({ row, col, content })),
  );

  let current = cells.flat().find((cell) => cell.content === '^');

  if (!current) return;

  let [dy, dx] = [-1, 0];

  while (true) {
    yield { cell: current, dy, dx };

    /** @type {number} */
    const nextRow = current.row + dy;
    /** @type {number} */
    const nextCol = current.col + dx;

    if (
      nextRow < 0 ||
      nextRow >= cells.length ||
      nextCol < 0 ||
      nextCol >= cells[0].length
    ) {
      return;
    }

    if (cells[nextRow][nextCol].content === '#') {
      [dy, dx] = [dx, -dy];
      continue;
    }

    current = cells[nextRow][nextCol];
  }
}

/**
 * @param {string[][]} map
 * @param {{row: number, col: number}} position
 * @returns {string[][]} -- The copy of the map with an obstacle in the specified position
 */
export function placeObstacle(map, { row, col }) {
  const m = map.map((line) => [...line]);
  m[row][col] = '#';
  return m;
}

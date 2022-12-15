/**
 * @typedef {{
 *   direction: 'h' | 'v',
 *   from: { x: number, y: number },
 *   to: { x: number, y: number }
 * }} Path
 */

/**
 * @param {string} row
 * @returns {Set<Path>}
 * @example parseRock('498,4 -> 498,6 -> 496,6')
 * //=> new Set([{
 *   direction: 'h',
 *   from: { x: 498, y: 4 },
 *   to: { x: 498, y: 6 }
 * }, {
 *   direction: 'v',
 *   from: { x: 498, y: 6 },
 *   to: { x: 496, y: 6 }
 * }])
 */
export function parseRock(row) {
  const points = row.split(' -> ').map((point) => point.split(',').map(Number));
  const lines = new Set();
  for (const [index, [fromX, fromY]] of points.entries()) {
    if (points[index + 1]) {
      const [toX, toY] = points[index + 1];
      lines.add({
        direction: fromX === toX ? 'h' : 'v',
        from: { x: fromX, y: fromY },
        to: { x: toX, y: toY },
      });
    }
  }
  return lines;
}

/**
 * @param {Array<Set<Path>>} paths
 * @returns {string[][]}
 */
export function buildMap(paths) {
  /** @type {string[][]} */
  const map = [[]];
  map[0][500] = '+';

  for (const path of paths) {
    for (const { direction, from, to } of path) {
      switch (direction) {
        case 'h': {
          const step = Math.sign(to.y - from.y);
          for (let { x, y } = from; y != to.y + step; y += step) {
            map[y] = map[y] ?? [];
            map[y][x] = '#';
          }
        }
        case 'v': {
          const step = Math.sign(to.x - from.x);
          for (let { x, y } = from; x != to.x + step; x += step) {
            map[y] = map[y] ?? [];
            map[y][x] = '#';
          }
        }
      }
    }
  }

  return Array.from(map.values()).map((row) => row || []);
}
/**
 * @param {string[][]} map
 * @returns {string}
 */
export function format(map) {
  const { min, max } = findMinMax(map);

  return map
    .map((row) => {
      if (row) row.length = max;
      else row = Array.from({ length: max });
      return row;
    })
    .map((row) =>
      Array.from(row.slice(min, max).values())
        .map((c) => c || '.')
        .join('')
    )
    .join('\n');
}

/**
 * @param {string[][]} map
 * @returns {{min: number, max: number}}
 * @example findMinMax([
 *   [undefined, undefined, 1],
 *   undefined,
 *   [1, undefined]
 * ])
 * //=> { min: 0, max: 3 }
 */
export function findMinMax(map) {
  return map.reduce(
    ({ min, max }, row) => {
      return !row
        ? { min, max }
        : {
            min: Math.min(
              min,
              row.findIndex((c) => !!c)
            ),
            max: Math.max(max, row.length),
          };
    },
    { min: Infinity, max: -Infinity }
  );
}

/**
 * @param {string[][]} map
 * @yields {string[][]}
 * @param {boolean} floor
 * @example
 * let it = pour(
 * [
 *   [   ,    , '+'     ],
 *   [                  ],
 *   [                  ],
 *   ['#', '#', '#', '#']
 * ],
 * false, { x: 2, y: 0 });
 * it.next().value
 * //=>
 * [
 *   [   ,    , '+'     ],
 *   [                  ],
 *   [   ,    , 'o'     ],
 *   ['#', '#', '#', '#']
 * ]
 * @example
 * let it = pour(
 * [
 *   [   ,    , '+'     ],
 *   [                  ],
 *   [                  ],
 *   ['#', '#', '#', '#']
 * ], false, { x: 2, y: 0 });
 * it.next();
 * it.next().value
 * //=>
 * [
 *   [   ,    , '+'     ],
 *   [                  ],
 *   [   , 'o', 'o'     ],
 *   ['#', '#', '#', '#']
 * ]
 */
export function* pour(map, floor = false, initial = { x: 500, y: 0 }) {
  map = structuredClone(map);

  sand: while (true) {
    let x = initial.x;
    let y = initial.y;

    fall: while (true) {
      if (++y === map.length) {
        if (floor) break fall;
        else break sand;
      }

      if (!map[y]?.[x]) {
      } else if (!map[y]?.[x - 1]) {
        x--;
      } else if (!map[y]?.[x + 1]) {
        x++;
      } else {
        break fall;
      }
    }

    map[y - 1][x] = 'o';

    yield map;

    if (floor && x === initial.x && y === initial.y + 1) break sand;
  }
}

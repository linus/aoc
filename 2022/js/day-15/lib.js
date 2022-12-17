/**
 * @typedef {{x: number, y: number}} Point
 */
/**
 * @param {string} input
 * @returns {{
 *   location: Point,
 *   beacon: Point,
 *   range: number
 * }}
 * @example parseSensor("Sensor at x=2, y=18: closest beacon is at x=-2, y=15")
 * //=> {
 *   location: { x: 2, y: 18 },
 *   beacon: { x: -2, y: 15 },
 *   range: 7
 * }
 */
export function parseSensor(input) {
  // @ts-ignore
  const { sx, sy, bx, by } = input.match(sensorRE)?.groups;

  const sensor = { x: Number(sx), y: Number(sy) };
  const beacon = { x: Number(bx), y: Number(by) };

  return {
    location: sensor,
    beacon,
    range: distance(sensor, beacon),
  };
}

const sensorRE =
  /^Sensor at x=(?<sx>-?\d+), y=(?<sy>-?\d+): closest beacon is at x=(?<bx>-?\d+), y=(?<by>-?\d+)$/;

/**
 * @param {Point} from
 * @param {Point} to
 * @returns {number}
 * @example distance({ x: 2, y: 18 }, { x: -2, y: 15 })
 * //=> 7
 */
export function distance(from, to) {
  return Math.abs(from.x - to.x) + Math.abs(from.y - to.y);
}

/**
 * @param {number} fromX
 * @param {number} toX
 * @param {number} y
 * @returns {Point[]}
 * @example line(5, 15, 10)
 * //=> [
 *   { x: 5, y: 10 },
 *   { x: 6, y: 10 },
 *   { x: 7, y: 10 },
 *   { x: 8, y: 10 },
 *   { x: 9, y: 10 },
 *   { x: 10, y: 10 },
 *   { x: 11, y: 10 },
 *   { x: 12, y: 10 },
 *   { x: 13, y: 10 },
 *   { x: 14, y: 10 },
 * ]
 */
export function line(fromX, toX, y) {
  return Array.from({ length: toX - fromX }, (_, i) => ({
    x: i + fromX,
    y,
  }));
}

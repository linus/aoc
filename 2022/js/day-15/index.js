import { distance, line, parseSensor } from './lib.js';

/**
 * @param {string} input
 * @param {number} row
 * @returns {{
 *   part1: number,
 *   part2: undefined
 * }}
 * @example solution(`
 * Sensor at x=2, y=18: closest beacon is at x=-2, y=15
 * Sensor at x=9, y=16: closest beacon is at x=10, y=16
 * Sensor at x=13, y=2: closest beacon is at x=15, y=3
 * Sensor at x=12, y=14: closest beacon is at x=10, y=16
 * Sensor at x=10, y=20: closest beacon is at x=10, y=16
 * Sensor at x=14, y=17: closest beacon is at x=10, y=16
 * Sensor at x=8, y=7: closest beacon is at x=2, y=10
 * Sensor at x=2, y=0: closest beacon is at x=2, y=10
 * Sensor at x=0, y=11: closest beacon is at x=2, y=10
 * Sensor at x=20, y=14: closest beacon is at x=25, y=17
 * Sensor at x=17, y=20: closest beacon is at x=21, y=22
 * Sensor at x=16, y=7: closest beacon is at x=15, y=3
 * Sensor at x=14, y=3: closest beacon is at x=15, y=3
 * Sensor at x=20, y=1: closest beacon is at x=15, y=3
 * `, 10)
 * //=> {
 *   part1: 26,
 *   part2: undefined
 * }
 */
export function solution(input, row = 2_000_000) {
  const sensors = input.trim().split('\n').map(parseSensor);

  const sensorRanges = sensors.map(({ location, range }) => ({
    min: location.x - range,
    max: location.x + range,
  }));
  const minX = sensorRanges.sort((a, b) => a.min - b.min)[0].min;
  const maxX = sensorRanges.sort((a, b) => b.max - a.max)[0].max;

  const unoccupiedPointsWithinRange = line(minX, maxX, row).filter((point) =>
    sensors.some(
      (sensor) =>
        !(sensor.beacon.x === point.x && sensor.beacon.y === point.y) &&
        distance(point, sensor.location) <= sensor.range
    )
  );

  return {
    part1: unoccupiedPointsWithinRange.length,
    part2: undefined,
  };
}

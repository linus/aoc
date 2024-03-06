import { range } from '../utils.js';

/**
 *
 * @param {number[]} race
 * @returns {number}
 * @example countWinningRaces([7, 9])
 * //=> 4
 */
export function countWinningRaces([time, distance]) {
  return range(0, time)
    .map((t) => t * (time - t))
    .filter((d) => d > distance).length;
}

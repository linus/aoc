import { transposeArray } from '../utils.js';

/**
 * @typedef {{
 *   num: number,
 *   from: number,
 *   to: number
 * }} Move
 */

/**
 * @param {string} input
 * @returns {{
 *   crates: string[][],
 *   moves: Move[]
 * }}
 */
export function parseInput(input) {
  const [crateDefinitions, moves] = input.split('\n\n');

  return {
    crates: parseCrateDefinitions(crateDefinitions),
    moves: parseMoves(moves),
  };
}

/**
 * @param {string} crateDefinitions
 * @returns {string[][]} the crates, each containing its letters
 * @example parseCrateDefinitions(`
 *     [D]
 * [N] [C]
 * [Z] [M] [P]
 *  1   2   3
 * `)
 * //=> [
 *   ['Z', 'N'],
 *   ['M', 'C', 'D'],
 *   ['P'],
 * ]
 */
export function parseCrateDefinitions(crateDefinitions) {
  const array = crateDefinitions
    .split('\n')
    .filter((line) => !!line.trim())
    .map((line) => line.split(''));

  return transposeArray(array.reverse())
    .filter(([firstChar]) => firstChar !== ' ')
    .map(([_, ...rest]) => rest.join('').trim().split(''));
}

/**
 * Parse a list of move definitions
 *
 * @param {string} moves The move definitions
 * @returns {Move[]} The moves
 * @example parseMoves(`
 * move 1 from 2 to 1
 * move 3 from 1 to 3
 * `)
 * //=> [
 *   {num: 1, from: 2, to: 1},
 *   {num: 3, from: 1, to: 3}
 * ]
 */
export function parseMoves(moves) {
  return moves.trim().split('\n').map(parseMove);
}

const moveRegex =
  /^move\s+(?<num>\d+)\s+from\s+(?<from>\d+)\s+to\s+(?<to>\d+)$/;
/**
 *
 * @param {string} move
 * @returns {Move}
 * @example parseMove('move 1 from 1 to 2')
 * //=> { num: 1, from: 1, to: 2}
 * @example parseMove('move 2 from 3 to 1')
 * //=> { num: 2, from: 3, to: 1}
 */
export function parseMove(move) {
  const match = move.trim().match(moveRegex)?.groups;

  return {
    num: Number(match?.num),
    from: Number(match?.from),
    to: Number(match?.to),
  };
}

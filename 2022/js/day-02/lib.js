/**
 * @typedef {number} move
 * @typedef {number} outcome
 *
 * JSDoc cannot parse TypeScript types, so let's use this trick:
 * https://github.com/jsdoc/jsdoc/issues/1073#issuecomment-167204327
 *
 * @typedef MoveTuple
 * @type {move[]}
 * @ts-ignore
 * @property {move} 0 - Their move
 * @property {move} 1 - Our move
 * @property {2} length - Tuple size
 */
const theirMoves = 'ABC';
const ourMoves = 'XYZ';

/**
 * Parse a move definition
 *
 * @param {string} definition The move definition, e.g. 'A X'
 * @returns {MoveTuple}
 * @example parseMove('A Y')
 * //=> [0, 1]
 * @example parseMove('B X')
 * //=> [1, 0]
 * @example parseMove('C Z')
 * //=> [2, 2]
 */
export function parseMove(definition) {
  const [them, us] = definition.split(' ');
  return [theirMoves.indexOf(them), ourMoves.indexOf(us)];
}

/**
 * Given their move and an outcome, calculate our move
 * @param {MoveTuple} param0 Their move and the outcome
 * @returns {MoveTuple} Their move and our calculated move
 * @example calculateMove([0, 1])
 * //=> [0, 0]
 * @example calculateMove([0, 0])
 * //=> [0, 2]
 * @example calculateMove([2, 2])
 * //=> [2, 0]
 */
export function calculateMove([them, outcome]) {
  if (outcome === 1) return [them, them];

  switch (them) {
    case 0:
      return [them, outcome === 0 ? 2 : 1];
    case 1:
      return [them, outcome === 0 ? 0 : 2];
    case 2:
      return [them, outcome === 0 ? 1 : 0];
  }

  throw new Error('Invalid input');
}

/**
 * Calculate the outcome score (0, 3, 6 for loss, draw, win, respectively)
 * @param {move} them Their move
 * @param {move} us Our move
 * @returns {number | undefined} The outcome score
 * @example calculateOutcomeScore(1, 1)
 * //=> 3
 * @example calculateOutcomeScore(0, 2)
 * //=> 0
 * @example calculateOutcomeScore(0, 1)
 * //=> 6
 * @example calculateOutcomeScore(2, 0)
 * //=> 6
 */
export function calculateOutcomeScore(them, us) {
  if (them === us) return 3;

  switch (them) {
    case 0:
      return us === 2 ? 0 : 6;
    case 1:
      return us === 0 ? 0 : 6;
    case 2:
      return us === 1 ? 0 : 6;
  }
}

/**
 * Calculate the score for the given play
 *
 * @param {MoveTuple} param0 - Their move and our move
 * @returns {number} The score
 */
export function calculateScore([them, us]) {
  const shapeScore = us + 1;
  return shapeScore + (calculateOutcomeScore(them, us) ?? 0);
}

/**
 * @typedef {[number, boolean]} Cell
 * @typedef {Cell[]} Row
 * @typedef {Row[]} Board
 * @typedef {number} Move
 */

/**
 * @param {string} s
 * @returns {Move[]}
 * @example parseMoves('17,4,2')
 * //=> [17, 4, 2]
 */
const parseMoves = (s) => s.split(',').map((n) => parseInt(n, 10));

/**
 * @param {string} input
 * @returns {Board}
 * @example parseBoard(`
 *   1 2\n
 *   3 4
 * `)
 * //=> [
 *   [[1, false], [2, false]],
 *   [[3, false], [4, false]],
 * ]
 */
const parseBoard = (input) =>
  input
    .trim()
    .split('\n')
    .map((row) =>
      row
        .trim()
        .split(/\s+/)
        .map((n) => parseInt(n, 10))
        .map((number) => [number, false])
    );

/**
 * @param {Board} board
 * @param {Move} move
 * @returns {Board}
 * @example makeMove([
 *   [[1, false], [2, true]],
 *   [[3, false], [4, false]],
 * ], 3)
 * //=> [
 *   [[1, false], [2, true]],
 *   [[3, true], [4, false]],
 * ]
 */
const makeMove = (board, move) =>
  board.map((row) => row.map(([n, marked]) => [n, marked || n === move]));

/**
 * @param {Board} board
 * @returns {boolean}
 * @example isWinning([
 *   [[1, true], [2, true]],
 *   [[3, false], [4, false]],
 * ])
 * //=> true
 * @example isWinning([
 *   [[1, true], [2, false]],
 *   [[3, true], [4, false]],
 * ])
 * //=> true
 * @example isWinning([
 *   [[1, false], [2, true]],
 *   [[3, true], [4, false]],
 * ])
 * //=> false
 */
const isWinning = (board) =>
  board.some((row) => row.every(([_, marked]) => marked)) ||
  transpose(board).some((col) => col.every(([_, marked]) => marked));

/**
 * @param {Board} board
 * @returns {number[]}
 * @example findUnmarked([
 *   [[1, true], [2, false]],
 *   [[3, true], [4, false]],
 * ])
 * //=> [2, 4]
 */
const findUnmarked = (board) =>
  board
    .flatMap((row) => row)
    .filter(([_, marked]) => !marked)
    .map(([n]) => n);

/**
 * @param {Board} board
 * @returns {Board}
 * @example transpose([
 *   [[1, false], [2, true]],
 *   [[3, true], [4, false]]
 * ])
 * //=> [
 *   [[1, false], [3, true]],
 *   [[2, true], [4, false]]
 * ]
 */
const transpose = (board) =>
  board[0].map((_, colIndex) => board.map((row) => row[colIndex]));

/**
 * @param {Board[]} boards
 * @param {Move[]} moves
 * @example part1([
 *   [
 *     [[1, false], [2, false]],
 *     [[3, false], [4, false]],
 *   ],
 *   [
 *     [[2, false], [1, false]],
 *     [[3, false], [4, false]],
 *   ]
 * ],
 * [1, 3, 4]
 * )
 * //=> 18
 */
function part1(boards, moves) {
  let winningBoard = null;
  let lastMove = null;

  while (!winningBoard) {
    lastMove = moves.shift();
    boards = boards.map((board) => makeMove(board, lastMove));
    winningBoard = boards.find(isWinning);
  }

  return (
    lastMove * findUnmarked(winningBoard).reduce((sum, number) => sum + number)
  );
}

/**
 * @param {Board[]} boards
 * @param {Move[]} moves
 * @example part2([
 *   [
 *     [[1, false], [2, false]],
 *     [[3, false], [4, false]],
 *   ],
 *   [
 *     [[2, false], [1, false]],
 *     [[3, false], [4, false]],
 *   ]
 * ],
 * [1, 3, 4]
 * )
 * //=> 8
 */
function part2(boards, moves) {
  let winningBoards = [];
  let lastMove = null;

  while (boards.length) {
    lastMove = moves.shift();
    [boards, winningBoards] = boards
      .map((board) => makeMove(board, lastMove))
      .map((board) => [board, isWinning(board)])
      .reduce(
        (result, [board, won]) => {
          result[won ? 1 : 0].push(board);

          return result;
        },
        [[], winningBoards]
      );
  }

  return (
    lastMove *
    findUnmarked(winningBoards.pop()).reduce((sum, number) => sum + number)
  );
}

module.exports = {
  part1,
  part2,
  parseMoves,
  parseBoard,
  isWinning,
  makeMove,
  findUnmarked,
  transpose,
};

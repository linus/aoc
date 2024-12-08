/**
 * @param {{row: number, col: number}} a
 * @param {{row: number, col: number}} b
 * @param {{row: number, col: number}} c
 * @returns {boolean}
 * @example isCollinear(
 *   { row: 0, col: 0 },
 *   { row: 8, col: 8 },
 *   { row: 9, col: 9 },
 * )
 * //=> true
 */

export function isCollinear(a, b, c) {
  return (
    a.row * (b.col - c.col) +
      b.row * (c.col - a.col) +
      c.row * (a.col - b.col) ===
    0
  );
}

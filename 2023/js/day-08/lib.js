/**
 * @param {string} instructions
R* @yields {(L|R)}
 * @example eternalInstructions('RL').next().value
 * //=> 'R'
 * @example const it = eternalInstructions('RL');
 * it.next();
 * it.next().value
 * //=> 'L'
 * @example const it = eternalInstructions('RL');
 * it.next();
 * it.next();
 * it.next().value
 * //=> 'R'
 */
export function* eternalInstructions(instructions) {
  while (true) yield* instructions;
}

/**
 * Calculates the least common multiple of two numbers.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} - the least common multiple
 * @example lcm(3, 5)
 * //=> 15
 * @example lcm(21, 6)
 * //=> 42
 */
export function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

/**
 * Calculates the greatest common divisor of two numbers.
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} - the greatest common divisor
 * @example gcd(15, 5)
 * //=> 5
 * @example gcd(1071, 462)
 * //=> 21
 */
export function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

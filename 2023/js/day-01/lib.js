/**
 *
 * @param {string} input
 * @returns {number}
 * @example findFirstAndLastNumber("1abc2")
 * //=> 12
 * @example findFirstAndLastNumber("pqr3stu8vwx")
 * //=> 38
 * @example findFirstAndLastNumber("a1b2c3d4e5f")
 * //=> 15
 * @example findFirstAndLastNumber("treb7uchet")
 * //=> 77
 */
export function findFirstAndLastNumber(input) {
  const numbers = input.match(/\d/g);
  return numbers ? Number(numbers[0] + numbers[numbers.length - 1]) : 0;
}

/**
 *
 * @param {string} input
 * @returns {number}
 * @example findFirstAndLastNumberWord("two1nine")
 * //=> 29
 * @example findFirstAndLastNumberWord("eightwothree")
 * //=> 83
 * @example findFirstAndLastNumberWord("xtwone3four")
 * //=> 24
 * @example findFirstAndLastNumberWord("4nineeightseven2")
 * //=> 42
 * @example findFirstAndLastNumberWord("zoneight234")
 * //=> 14
 * @example findFirstAndLastNumberWord("7pqrstsixteen")
 * //=> 76
 * @example findFirstAndLastNumberWord("eightsevenvqvzlqxkbm6rqhsgqpnine7twonex")
 * //=> 81
 */
export function findFirstAndLastNumberWord(input) {
  const numbers = Array.from(
    input.matchAll(/(?=(one|two|three|four|five|six|seven|eight|nine|\d))/g)
  ).map(([, number]) => number);
  return Number(toNumber(numbers[0]) + toNumber(numbers[numbers.length - 1]));
}

const numbers = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};

/**
 *
 * @param {('one'|'two'|'three'|'four'|'five'|'six'|'seven'|'eight'|'nine')} s
 * @returns {string}
 * @example toNumber("one")
 * //=> "1"
 * @example toNumber("two")
 * //=> "2"
 * @example toNumber("4")
 * //=> "4"
 */
export function toNumber(s) {
  return numbers[s] ?? s;
}

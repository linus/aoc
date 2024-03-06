/**
 * @param {string} input
 * @returns {{
 *   no: number,
 *   winning: number[],
 *   numbers: number[]
 * }}
 * @example parseCard("Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53")
 * //=> {
 *   no: 1,
 *   winning: [41, 48, 83, 86, 17],
 *   numbers: [83, 86, 6, 31, 17, 9, 48, 53],
 * }
 * @example parseCard("Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19")
 * //=> {
 *   no: 2,
 *   winning: [13, 32, 20, 16, 61],
 *   numbers: [61, 30, 68, 82, 17, 32, 24, 19],
 * }
 * @example parseCard("Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1")
 * //=> {
 *   no: 3,
 *   winning: [1, 21, 53, 59, 44],
 *   numbers: [69, 82, 63, 72, 16, 21, 14, 1],
 * }
 * @example parseCard("Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83")
 * //=> {
 *   no: 4,
 *   winning: [41, 92, 73, 84, 69],
 *   numbers: [59, 84, 76, 51, 58, 5, 54, 83],
 * }
 * @example parseCard("Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36")
 * //=> {
 *   no: 5,
 *   winning: [87, 83, 26, 28, 32],
 *   numbers: [88, 30, 70, 12, 93, 22, 82, 36],
 * }
 * @example parseCard("Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11")
 * //=> {
 *   no: 6,
 *   winning: [31, 18, 13, 56, 72],
 *   numbers: [74, 77, 10, 23, 35, 67, 36, 11],
 * }
 */
export function parseCard(input) {
  const re =
    /Card\s+(?<no>\d+):\s+(?<winning>(?:\d+\s+)+\d+)\s+\|\s+(?<numbers>(?:\d+\s+)+\d+)/;
  // @ts-ignore
  const { no, winning, numbers } = re.exec(input)?.groups;

  return {
    no: Number(no),
    winning: winning.split(/\s+/).map(Number),
    numbers: numbers.split(/\s+/).map(Number),
  };
}

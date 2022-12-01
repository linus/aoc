const openingBraces = '([{<';
const closingBraces = ')]}>';

/**
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 */
function solution(input) {
  const [valid, invalid] = input
    .trim()
    .split('\n')
    .map((line) => check(line))
    .reduce(
      (result, [openBraces, points]) => {
        result[points > 0 ? 1 : 0].push([openBraces, points]);
        return result;
      },
      [[], []]
    );

  const part1 = invalid
    .map(([, points]) => points)
    .reduce((sum, num) => sum + num);

  const solved = valid
    .map(([open]) => open)
    .map((openBraces) =>
      openBraces
        .reverse()
        .map((char) => openingBraces.indexOf(char) + 1)
        .reduce((score, point) => score * 5 + point, 0)
    )
    .sort((a, b) => b - a);

  const part2 = solved[(solved.length / 2) | 0];

  return {
    part1,
    part2,
  };
}

/**
 * @param {string} line
 * @returns 
 */
function check(line) {
  const openBraces = [];

  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137,
  };

  for (const char of line) {
    if (openingBraces.includes(char)) {
      openBraces.push(char);
    } else if (closingBraces.includes(char)) {
      const closingIndex = closingBraces.indexOf(char);
      const openingIndex = openingBraces.indexOf(openBraces.pop());
      if (closingIndex !== openingIndex) {
        console.error(
          `Expected ${closingBraces[openingIndex]}, but found ${char} instead.`
        );
        return [openBraces, points[char]];
      }
    }
  }

  return [openBraces, 0];
}

module.exports = {
  solution,
};

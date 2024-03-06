import { parseGame } from './lib.js';

/**
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
 * Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
 * Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
 * Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
 * Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
 * `)
 * //=> {
 *   part1: 8,
 *   part2: 2286,
 * }
 */
export function solution(input) {
  const bag = {
    red: 12,
    green: 13,
    blue: 14,
  };

  const games = input.trim().split('\n').map(parseGame);
  const validGames = games.filter(
    ({ cubes: { red, green, blue } }) =>
      red <= bag.red && green <= bag.green && blue <= bag.blue
  );

  return {
    part1: validGames.map(({ id }) => id).reduce((a, b) => a + b),
    part2: games
      .map(({ cubes: { red, green, blue } }) => red * green * blue)
      .reduce((a, b) => a + b),
  };
}

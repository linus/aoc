/**
 * @typedef {{
 *   id: number,
 *   cubes: {
 *     red: number,
 *     green: number,
 *     blue: number
 *   }
 * }} Game
 */

/**
 *
 * @param {string} input
 * @returns {Game}
 * @example parseGame("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green")
 * //=> {
 *   id: 1,
 *   cubes: {
 *      red: 4,
 *      green: 2,
 *      blue: 6,
 *   },
 * }
 */
export function parseGame(input) {
  const cubes = {
    red: 0,
    green: 0,
    blue: 0,
  };

  const [game, setDefinitions] = input.split(/\s*:\s*/);

  const sets = setDefinitions.split(/\s*;\s*/).map((set) =>
    set
      .split(/\s*,\s*/)
      .map((cube) => cube.split(' '))
      .map(([count, color]) => [Number(count), color])
  );

  for (const set of sets) {
    for (const [count, color] of set) {
      // @ts-ignore
      cubes[color] = Math.max(cubes[color], count);
    }
  }

  return {
    id: Number(game.split(/\s+/)[1]),
    cubes,
  };
}

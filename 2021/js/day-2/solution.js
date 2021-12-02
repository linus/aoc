/**
 * It seems like the submarine can take a series of commands like forward 1,
 * down 2, or up 3:
 *
 * @typedef {[('forward'|'down'|'up'), number]} Command
 *
 * @param {string} commandInput The input string to parse
 * @returns {Command} The parsed command
 *
 * @example parseCommand('forward 5')
 * //=> ['forward', 5]
 * @example parseCommand('invalid 5')
 * //=> null
 * @example parseCommand()
 * //=> null
 */
function parseCommand(commandInput) {
  try {
    const { direction, amount } = commandInput
      .trim()
      .match(/^(?<direction>(forward|down|up))\s+(?<amount>\d+)$/).groups;

    return [direction, parseInt(amount, 10)];
  } catch (e) {
    return null;
  }
}

/**
 * - forward X increases the horizontal position by X units.
 * - down X **increases** the depth by X units.
 * - up X **decreases** the depth by X units.
 *
 * Note that since you're on a submarine, down and up affect your **depth**, and
 * so they have the opposite result of what you might expect.
 *
 * The submarine seems to already have a planned course (your puzzle input).
 * You should probably figure out where it's going. For example:
 *
 * ```text
 * forward 5
 * down 5
 * forward 8
 * up 3
 * down 8
 * forward 2
 * ```
 *
 * Your horizontal position and depth both start at 0. The steps above would
 * then modify them as follows:
 *
 * - `forward 5` adds `5` to your horizontal position, a total of `5`.
 * - `down 5` adds `5` to your depth, resulting in a value of `5`.
 * - `forward 8` adds `8` to your horizontal position, a total of `13`.
 * - `up 3` decreases your depth by `3`, resulting in a value of `2`.
 * - `down 8` adds `8` to your depth, resulting in a value of `10`.
 * - `forward 2` adds `2` to your horizontal position, a total of `15`.
 *
 * After following these instructions, you would have a horizontal position of
 * `15` and a depth of `10`. (Multiplying these together produces `150`.)
 *
 * Calculate the horizontal position and depth you would have after following
 * the planned course. **What do you get if you multiply your final horizontal
 * position by your final depth?**
 *
 * @param {Command[]} commands The commands by which to navigate
 * @returns {number} The product of our position and depth
 *
 * @example part1([
 *   ['forward', 5],
 *   ['down', 5],
 *   ['forward', 8],
 *   ['up', 3],
 *   ['down', 8],
 *   ['forward', 2],
 * ])
 * //=> 150
 */
function part1(commands) {
  const move = ([position, depth], [direction, amount]) =>
    direction === 'forward'
      ? [position + amount, depth]
      : direction === 'down'
      ? [position, depth + amount]
      : direction === 'up'
      ? [position, depth - amount]
      : [position, depth];

  const [position, depth] = commands.reduce(move, [0, 0]);

  return position * depth;
}

/**
 * Based on your calculations, the planned course doesn't seem to make any
 * sense. You find the submarine manual and discover that the process is
 * actually slightly more complicated.
 *
 * In addition to horizontal position and depth, you'll also need to track al
 * third value, **aim**, which also starts at 0. The commands also mean something
 * entirely different than you first thought:
 *
 * - down X **increases** your aim by X units.
 * - up X **decreases** your aim by X units.
 * - forward X does two things:
 *   - It increases your horizontal position by X units.
 *   - It increases your depth by your aim **multiplied by** X.
 *
 * Again note that since you're on a submarine, down and up do the opposite of
 * what you might expect: "down" means aiming in the positive direction.
 *
 * Now, the above example does something different:
 *
 * - `forward 5` adds `5` to your horizontal position, a total of `5`. Because
 * your aim is `0`, your depth does not change.
 * - `down 5` adds `5` to your aim, resulting in a value of `5`.
 * - `forward 8` adds `8` to your horizontal position, a total of `13`. Because
 * your aim is `5`, your depth increases by `8*5=40`.
 * - `up 3` decreases your aim by `3`, resulting in a value of `2`.
 * - `down 8` adds `8` to your aim, resulting in a value of `10`.
 * - `forward 2` adds `2` to your horizontal position, a total of `15`. Because
 * your aim is `10`, your depth increases by `2*10=20` to a total of `60`.
 *
 * After following these new instructions, you would have a horizontal
 * position of `15` and a depth of `60`. (Multiplying these produces `900`.)
 *
 * Using this new interpretation of the commands, calculate the horizontal
 * position and depth you would have after following the planned course. **What
 * do you get if you multiply your final horizontal position by your final
 * depth?**
 *
 * @param {Command[]} commands The commands by which to navigate
 * @returns {number} The product of our position and depth
 *
 * @example part2([
 *   ['forward', 5],
 *   ['down', 5],
 *   ['forward', 8],
 *   ['up', 3],
 *   ['down', 8],
 *   ['forward', 2],
 * ])
 * //=> 900
 */
function part2(commands) {
  const move = ([position, depth, aim], [direction, amount]) =>
    direction === 'forward'
      ? [position + amount, depth + aim * amount, aim]
      : direction === 'down'
      ? [position, depth, aim + amount]
      : direction === 'up'
      ? [position, depth, aim - amount]
      : [position, depth, aim];

  const [position, depth] = commands.reduce(move, [0, 0, 0]);

  return position * depth;
}

module.exports = {
  parseCommand,
  part1,
  part2,
};

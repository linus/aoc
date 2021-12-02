/** @tscheck */

const { parseCommand, part1, part2 } = require('./solution');

/**
 * The solution for Advent of Code 2021, day 2. It has come to this:
 *
 * Now, you need to figure out how to pilot this thing.
 *
 */
function main() {
  let input = [];
  process.stdin
    .on('data', (chunk) => input.push(chunk))
    .on('end', () => {
      const commands = input
        .join('')
        .split(/\n+/)
        .map(parseCommand)
        .filter(Boolean);

      console.log('part 1:', part1(commands));
      console.log('part 2:', part2(commands));
    });
}

main(process.argv.slice(2));

const { parseDefinition, solution } = require('./solution');

/**
 * The solution for Advent of Code 2021, day 3. It has come to this:
 *
 * Now, you need to figure out how to pilot this thing.
 *
 */
function main() {
  let input = [];
  process.stdin
    .on('data', (chunk) => input.push(chunk))
    .on('end', () => {
      const lines = input
        .join('')
        .split(/\n/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => parseDefinition(s));

      const { part1, part2 } = solution(lines);
      console.log('part 1:', part1);
      console.log('part 2:', part2);
    });
}

main(process.argv.slice(2));

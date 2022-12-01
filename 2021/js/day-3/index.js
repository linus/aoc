const { part1, part2 } = require('./solution');

/**
 * --- Day 3: Binary Diagnostic ---
 *
 * The submarine has been making some odd creaking noises, so you ask it to
 * produce a diagnostic report just in case.
 */
function main() {
  let input = [];
  process.stdin
    .on('data', (chunk) => input.push(chunk))
    .on('end', () => {
      const commands = input
        .join('')
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean)
        .map((s) => parseInt(s, 2));

      console.log('part 1:', part1(commands));
      console.log('part 2:', part2(commands));
    });
}

main(process.argv.slice(2));

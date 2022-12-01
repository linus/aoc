const { parseMoves, parseBoard, part1, part2 } = require('./solution');

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
      const [moveInput, ...boardInput] = input
        .join('')
        .split(/\n\n/)
        .map((s) => s.trim())
        .filter(Boolean);

      const moves = parseMoves(moveInput);
      const boards = boardInput.map(parseBoard);
      console.log('part 1:', part1(boards.slice(0), moves.slice(0)));
      console.log('part 2:', part2(boards.slice(0), moves.slice(0)));
    });
}

main(process.argv.slice(2));

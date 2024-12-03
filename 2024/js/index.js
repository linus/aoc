import { createReadStream } from 'fs';
/**
 *
 * 🕯🕯🕯🕯 Advent of Code 2024 🕯🕯🕯🕯
 *
 * @param {string} day
 * @param {string=} inputFile
 *
 * Runs the solution for the specified day.
 *
 */

async function main(day, inputFile) {
  const { solution } = await import(`./day-${day.padStart(2, '0')}/index.js`);
  const inputStream = inputFile ? createReadStream(inputFile) : process.stdin;

  const input = [];
  for await (const chunk of inputStream) {
    input.push(chunk);
  }

  const { part1, part2 } = solution(input.join(''));

  console.log('part 1:', part1);
  console.log('part 2:', part2);
}

// @ts-ignore
main(...process.argv.slice(2));

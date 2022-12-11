import { createReadStream } from 'fs';
/**
 *
 * Santa's reindeer typically eat regular reindeer food, but they need a lot
 * of [magical energy][magical_energy] to deliver presents on Christmas. For that, their
 * favorite snack is a special type of *star* fruit that only grows deep in the
 * jungle. The Elves have brought you on their annual expedition to the grove
 * where the fruit grows.
 *
 * To supply enough magical energy, the expedition needs to retrieve a minimum
 * of *fifty stars* by December 25th. Although the Elves assure you that the
 * grove has plenty of fruit, you decide to grab any fruit you see along the
 * way, just in case.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on
 * each day in the Advent calendar; the second puzzle is unlocked when you
 * complete the first. Each puzzle grants *one star*. Good luck!
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

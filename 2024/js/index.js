import { createReadStream } from 'fs';
/**
 *
 * --- Day 1: Historian Hysteria ---
 *
 * The Chief Historian is always present for the big Christmas sleigh launch,
 * but nobody has seen him in months! Last anyone heard, he was visiting
 * locations that are historically significant to the North Pole; a group of
 * Senior Historians has asked you to accompany them as they check the places
 * they think he was most likely to visit.
 *
 * As each location is checked, they will mark it on their list with a _star_.
 * They figure the Chief Historian must be in one of the first fifty places
 * they'll look, so in order to save Christmas, you need to help them get _fifty
 * stars_ on their list before Santa takes off on December 25th.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on each
 * day in the Advent calendar; the second puzzle is unlocked when you complete
 * the first. Each puzzle grants _one star_. Good luck!
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

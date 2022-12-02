import { createReadStream } from 'fs';
import solution from './solution.js';

function main(inputFile) {
  const inputStream = inputFile ? createReadStream(inputFile) : process.stdin;
  let input = [];
  inputStream
    .on('data', (chunk) => input.push(chunk))
    .on('end', () => {
      const { part1, part2 } = solution(input.join('').trim());

      console.log('part 1:', part1);
      console.log('part 2:', part2);
    });
}

main(...process.argv.slice(2));

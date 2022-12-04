import { createReadStream } from 'fs';

async function main(day, inputFile) {
  const { default: solution } = await import(`./day-${day.padStart(2, '0')}/index.js`);
  const inputStream = inputFile ? createReadStream(inputFile) : process.stdin;
  const input = [];
  inputStream
    .on('data', (chunk) => input.push(chunk))
    .on('end', () => {
      const { part1, part2 } = solution(input.join(''));

      console.log('part 1:', part1);
      console.log('part 2:', part2);
    });
}

main(...process.argv.slice(2));

const {
    part1,
    part2,
} = require('./solution');

/**
 * @tscheck
 * 
 * The solution for Advent of Code 2021, day 1. The following is the
 * description of the situation in which we find ourselves:
 * 
 * As the submarine drops below the surface of the ocean, it automatically
 * performs a sonar sweep of the nearby sea floor. On a small screen, the
 * sonar sweep report (your puzzle input) appears: each line is a measurement
 * of the sea floor depth as the sweep looks further and further away from the
 * submarine.
 */
function main() {
    let input = [];
    process.stdin
      .on('data', (chunk) => input.push(chunk))
      .on('end', () => {
          const numbers = input
            .join('')
            .split(/\s+/)
            .map(s => s.trim())
            .filter(Boolean)
            .map(s => parseInt(s, 10));

            console.log('part 1', part1(numbers));
            console.log('part 2', part2(numbers));
      });
}

main(process.argv.slice(2));

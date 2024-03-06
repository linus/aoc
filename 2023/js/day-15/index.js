import { hash } from './lib.js';

/**
 *
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution('rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7')
 * //=> {
 *   part1: 1320,
 *   part2: 145
 * }
 */
export function solution(input) {
  const initializationSequence = input.trim().split(',');

  const boxes = Array.from({ length: 256 }, () => []);
  const lenses = initializationSequence
    .map((sequence) => sequence.split(/=|-/))
    .map(([label, focalLength]) => [hash(label), label, focalLength]);

  for (const [hash, label, focalLength] of lenses) {
    const index = boxes[hash].findIndex(
      ([existingLabel]) => existingLabel === label
    );
    if (focalLength === '') {
      if (index >= 0) boxes[hash].splice(index, 1);
    } else {
      if (index >= 0) boxes[hash].splice(index, 1, [label, focalLength]);
      else boxes[hash].push([label, focalLength]);
    }
  }

  const focusingPower = boxes.reduce((focusingPower, lenses, box) => {
    return (
      focusingPower +
      lenses.reduce(
        (x, [_, focalLength], slot) => x + (box + 1) * (slot + 1) * focalLength,
        0
      )
    );
  }, 0);

  return {
    part1: initializationSequence.map(hash).reduce((a, b) => a + b),
    part2: focusingPower,
  };
}

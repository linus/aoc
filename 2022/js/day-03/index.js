import { chunkArray } from '../utils.js';

function parseLine(line) {
  return line.split('');
}

function parseContents(itemList) {
  const len = itemList.length / 2;
  const firstCompartment = itemList.slice(0, len);
  const secondCompartment = itemList.slice(len);
  return [
    firstCompartment,
    secondCompartment,
  ]
}

function findCommon([first, ...rest]) {
  return first.find(item => rest.every(other => other.includes(item)));
}

const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

function getPriority(item) {
  return 1 + priorities.indexOf(item);
}

export default function solution(input) {
  let lines = input.split('\n');
  const part1 = lines
    .map(parseLine)
    .map(parseContents)
    .map(findCommon)
    .map(getPriority)
    .reduce((a, b) => a + b);

  const part2 = Array.from(chunkArray(lines.map(parseLine), 3))
    .map(findCommon)
    .map(getPriority)
    .reduce((a, b) => a + b);

  return {
    part1, 
    part2, 
  };
};


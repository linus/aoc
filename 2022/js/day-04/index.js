function parseLine(line) {
  const [first, second] = line.split(',');

  return [
    parseSections(first),
    parseSections(second),
  ]
}

function parseSections(definition) {
  const [from, to] = definition.split('-');
  return [Number(from), Number(to)];
}

function doesContain([
  [from1, to1],
  [from2, to2]
]) {
  return from1 <= from2 && to1 >= to2 || from1 >= from2 && to1 <= to2;
}

function doesOverlap([
  [from1, to1],
  [from2, to2]
]) {
  return !(from1 < from2 && to1 < from2 || from2 < from1 && to2 < from1);
}

export default function solution(input) {
  const lines = input.split('\n')
    .map(parseLine);

  const part1 = lines
    .filter(doesContain)
    .length;

  const part2 = lines
    .filter(doesOverlap)
    .length;

  return {
    part1,
    part2,
  };
};

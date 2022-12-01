function parseInput(string) {
  const [signalPatterns, outputValues] = string.split(/\s+\|\s+/);

  return [signalPatterns.split(/\s+/), outputValues.split(/\s+/)];
}

function solution(input) {
  console.log(input);
  const part1 = input.reduce(
    (count, [, outputValues]) =>
      count +
      outputValues.filter((v) => [2, 3, 4, 7].includes(v.length)).length,
    0
  );

  const segments = {
    a: null,
    b: null,
    c: null,
    d: null,
    e: null,
    f: null,
    g: null,
  };

  const outputValues = new Set(
    input.flatMap(([, outputValues]) => outputValues)
  );
  const outputToNumber = Array.from(outputValues).reduce((values, value) => {
    const length = value.length;
    if (length === 2) values.set(1, value);
    else if (length === 3) values.set(7, value);
    else if (length === 4) values.set(4, value);
    else if (length === 7) values.set(8, value);
    return values;
  }, new Map());

  segments.a = values
    .get(7)
    .split('')
    .filter((v) => !values.get(1).split('').includes(v));

  return {
    part1,
  };
}

function solve([signalPatterns, outputValues]) {

  return null;
}

module.exports = {
  parseInput,
  solution,
};

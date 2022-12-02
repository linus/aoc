const theirMoves = 'ABC';
const ourMoves = 'XYZ';

function parseMove(definition) {
  const [them, us] = definition.split(' ');
  return [theirMoves.indexOf(them), ourMoves.indexOf(us)];
}

function calculateMove([them, outcome]) {
  if (outcome === 1) return [them, them];

  switch (them) {
    case 0: return [them, outcome === 0 ? 2 : 1];
    case 1: return [them, outcome === 0 ? 0 : 2];
    case 2: return [them, outcome === 0 ? 1 : 0];
  }
}

function calculateOutcomeScore(them, us) {
  if (them === us) return 3;

  switch (them) {
    case 0: return us === 2 ? 0 : 6;
    case 1: return us === 0 ? 0 : 6;
    case 2: return us === 1 ? 0 : 6;
  }
}

function calculateScore([them, us]) {
  const shapeScore = us + 1;
  return shapeScore + calculateOutcomeScore(them, us);
}

export default function solution(input) {
  const definitions = input.split('\n');

  const part1Scores = definitions
    .map(parseMove)
    .map(calculateScore);

  const part2Scores = definitions
    .map(parseMove)
    .map(calculateMove)
    .map(calculateScore);

  return {
    part1: part1Scores.reduce((a, b) => a + b),
    part2: part2Scores.reduce((a, b) => a + b),
  };
}

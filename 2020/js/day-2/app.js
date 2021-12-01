process.stdin.on('data', (chunk) => {
  const inputs = chunk.toString()
    .split(/\n+/)
    .map(s => s.trim())
    .filter(s => !!s);

  const valid = inputs.filter(s => validate(parse(s)));

  console.log(valid.length);

  const validSecond = inputs.filter(s => validateSecond(parse(s)));

  console.log(validSecond.length);
})

function validateSecond({ min, max, char, password }) {
  return (char === password[min - 1] && char !== password[max - 1]) || (char !== password[min - 1] && char === password[max - 1]);
}

function validate({ min, max, char, password }) {
  const occurences = password.match(new RegExp(char, 'g'));

  return occurences && occurences.length >= min && occurences.length <= max;
}

function parse (definition) {
  const match = definition.match(/^\s*(\d+)-(\d+)\s+(\w+):\s+(\w+)/);

  return match && {
    min: parseInt(match[1], 10),
    max: parseInt(match[2], 10),
    char: match[3],
    password: match[4],
  };
}

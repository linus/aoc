process.stdin.on('data', (chunk) => {
  const groups = chunk.toString()
    .trim()
    .split('\n\n');

 console.log(calculateUnanimousYesAnswers(groups));
});

function calculateUnanimousYesAnswers(groups) {
  return groups
    .map(s => s.trim().split(/\s+/))
    .map(persons => persons.map(s => s.trim().split('')))
    .map(persons => {
      return persons
        .slice(1).reduce((unanimous, answers) => {
          return unanimous.filter(c => answers.includes(c))
        }, persons[0]);
      })
    .map(a => a.length)
    .reduce((sum, len) => sum + len, 0);
}

function calulateYesAnswers(groups) {
  return groups
    .map(s => s.replace(/\s+/g, ''))
    .map(s => s.split(''))
    .map(a => new Set(a))
    .map(s => Array.from(s))
    .map(a => a.length)
    .reduce((sum, len) => sum + len, 0);
}

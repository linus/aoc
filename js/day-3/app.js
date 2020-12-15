process.stdin.on('data', (chunk) => {
  const map = chunk.toString().split('\n').map(s => s.split(''));

  const results = [
    traverse(map, 1),
    traverse(map, 3),
    traverse(map, 5),
    traverse(map, 7),
    traverse(map.filter((_, i) => !(i % 2)), 1),
  ];

  console.log(
    results
      .map(r => r.filter(s => s === '#').length)
      .reduce((res, len) => res * len, 1)
  );
});

function traverse (map, step) {
  let col = 0;
  let result = [];

  for (row of map.slice(1)) {
    col += step;
    col %= row.length;

    result.push(row[col]);
  }

  return result;
}

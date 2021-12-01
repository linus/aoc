process.stdin.on('data', (chunk) => {
  const passes = chunk.toString().split('\n');

  const sortedSeats = passes
    .map(locate)
    .map(calculateSeat)
    .sort((a, b) => a - b);

  console.log(sortedSeats);

  const seatBeforeMine = sortedSeats.find((seat, index) => sortedSeats[index + 1] && seat === sortedSeats[index + 1] - 2);
  console.log(seatBeforeMine + 1);
});

function calculateSeat ([row, col]) {
  return row * 8 + col;
}

function locate (pass) {
  const row = locateGeneric(pass.split('').slice(0, 7), ['B', 'F'], [0, 127]);
  const col = locateGeneric(pass.split('').slice(7), ['R', 'L'], [0, 7]);

  return [row[0], col[0]];
}

function locateGeneric (array, bins, interval) {
  const bounds = [Math.ceil, Math.floor];
  for (const char of array) {
    const bin = bins.indexOf(char);
    const midpoint = interval[0] + bounds[bin]((interval[1] - interval[0]) / 2);

    interval[bin] = midpoint;
  }

  return interval;
}

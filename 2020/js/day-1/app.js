process.stdin.on('data', (chunk) => {
  const nums = chunk.toString()
    .split(/\s+/)
    .map(s => s.trim())
    .filter(s => !!s)
    .map(s => parseInt(s, 10));

  console.log(findProduct(nums));
  console.log(findThreeProduct(nums));
})

function findProduct(nums) {
  for (const [index, first] of nums.entries()) {
    for (const second of nums.slice(index + 1)) {
      if (first + second === 2020) return first * second;
    }
  }
}

function findThreeProduct(nums) {
  for (const [index, first] of nums.entries()) {
    for (const [secondIndex, second] of nums.slice(index + 1).entries()) {
      for (const third of nums.slice(secondIndex + 1)) {
        if (first + second + third === 2020) return first * second * third;
      }
    }
  }
}

export default function solution(input) {
  const calories = input
    .split(/\n\n/)
    .map((s) => s.split(/\n/).map((n) => Number(n)))
    .map((nums) => nums.reduce((a, b) => a + b))
    .sort((a, b) => b - a);

  return {
    part1: calories[0],
    part2: calories[0] + calories[1] + calories[2]
  };
};

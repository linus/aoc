/**
 *
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution('3,4,3,1,2')
 * //=> {
 *   part1: 5934,
 *   part2: 26984457539,
 * }
 */
function solution(input) {
  const initialPopulation = frequencies(input.split(',').map(Number));

  const days = populationIterator(initialPopulation);
  let populationFrequency = days.next();
  let day = 0;

  while (++day < 80) populationFrequency = days.next();
  const part1 = countPopulation(populationFrequency.value);

  while (day++ < 256) populationFrequency = days.next();
  const part2 = countPopulation(populationFrequency.value);

  return {
    part1,
    part2,
  };
}

/**
 * @param {Map<number, number>} frequency
 * @returns {number} The total population
 * @example countPopulation(new Map([[3, 2], [4, 1], [1, 1], [2, 1]]))
 * //=> 5
 */
function countPopulation(frequency) {
  return Array.from(frequency.values()).reduce((sum, num) => sum + num);
}

/**
 * @param {Map<number, number>} initialPopulation
 * @yields {Map<number, number>} The next total population of lanternfish
 * @example populationIterator([[3, 2], [4, 1], [1, 1], [2, 1]]).next()
 * //=> {
 *   value: new Map([[2, 2], [3, 1], [0, 1], [1, 1]]),
 *   done: false,
 * }
 */
function* populationIterator(initialPopulation) {
  let population = new Map(initialPopulation);

  while (true) {
    const spawns = population.get(0) || 0;
    population = Array.from(population.entries()).reduce(
      (population, [spawnTime, freq]) => {
        const nextSpawnTime = spawnTime === 0 ? 6 : spawnTime - 1;
        const nextFreq = spawnTime === 7 ? freq + spawns : freq;
        population.set(nextSpawnTime, nextFreq);
        return population;
      },
      new Map()
    );
    if (spawns > 0) population.set(8, spawns);

    if (yield population) population = new Map(initialPopulation);
  }
}
/**
 * Returns a map from distinct items in iterable to the number of times they
 * appear.
 * @template T
 * @param {T[]} iterable
 * @returns {Map<T, number>}
 * @example frequencies([1, 2, 1, 3, 2])
 * //=> new Map([[1, 2], [2, 2], [3, 1]])
 * @example frequencies([])
 * //=> new Map()
 */
function frequencies(iterable) {
  return Array.from(iterable).reduce((result, item) => {
    result.set(item, 1 + (result.get(item) || 0));
    return result;
  }, new Map());
}

module.exports = {
  solution,
  populationIterator,
  frequencies,
  countPopulation,
};

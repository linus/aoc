/**
 * @typedef {{energyLevel: number}} Octopus
 * @typedef {{neighbors: Octopus[]}} Neighborhood
 * @typedef {Octopus & Neighborhood} FriendlyOctopus
 */

/**
 * @param {string} input
 * @example
 */
function solution(input) {
  let consortium = octopusConsortium(
    input
      .trim()
      .split('\n')
      .map((row) =>
        row.split('').map((n) => ({
          energyLevel: Number(n),
        }))
      )
  );
  let flashes = 0;
  let step = 0;
  let next;
  while (step++ < 100) {
    next = consortium.next();
    flashes += next.value ?? 0;
  }

  while (!next?.done) {
    ++step;
    next = consortium.next();
  }

  return {
    part1: flashes,
    part2: step - 2,
  };
}

/**
 * @param {Octopus[][]} initialState
 */
function* octopusConsortium(initialState) {
  let state = initializeState();

  let allFlashed = false;

  while (!allFlashed) {
    const yieldResult = yield step(state);
    allFlashed = state.flat().every((o) => o.energyLevel === 0);
    if (yieldResult) state = initializeState();
  }

  function initializeState() {
    return initialState.map((row, rowIndex) =>
      row.map((o, index) =>
        initializeNeigbors(o, initialState, rowIndex, index)
      )
    );
  }
}

/**
 * @param {Octopus} octopus
 * @param {Octopus[][]} state
 * @param {number} rowIndex
 * @param {number} index
 * @returns {FriendlyOctopus}
 */
function initializeNeigbors(octopus, state, rowIndex, index) {
  return {
    ...octopus,
    neighbors: findNeighbors(state, rowIndex, index),
  };
}

/**
 * @param {FriendlyOctopus[]} hood
 * @returns {number}
 */
function step(hood) {
  hood.flat().forEach((octopus) => {
    octopus.energyLevel = (octopus.energyLevel + 1) % 10;
  });

  return hood
    .flat()
    .filter((o) => o.energyLevel === 0)
    .reduce(
      (flashes, o) =>
        flashes + 1 + step(o.neighbors.filter((n) => n.energyLevel !== 0)),
      0
    );
}

/**
 * @param {Octopus[][]} array
 * @param {number} rowIndex
 * @param {number} index
 * @returns {Octopus[]}
 */
function findNeighbors(array, rowIndex, index) {
  const neighbors = [array[rowIndex][index - 1], array[rowIndex][index + 1]];

  if (array[rowIndex - 1]) {
    neighbors.push(
      array[rowIndex - 1][index - 1],
      array[rowIndex - 1][index],
      array[rowIndex - 1][index + 1]
    );
  }

  if (array[rowIndex + 1]) {
    neighbors.push(
      array[rowIndex + 1][index - 1],
      array[rowIndex + 1][index],
      array[rowIndex + 1][index + 1]
    );
  }

  return neighbors.filter(Boolean);
}

module.exports = {
  solution,
};

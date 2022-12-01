/**
 * 
 * @param {string} input 
 * @returns {{part1: number}}
 * @example solution(`NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`)
 * //=> {
 *   part1: 1588,
 *   part2: null,
 * }
 */
function solution(input) {
  const inputArray = input.split(/\n+/);
  const template = inputArray.shift();
  const rules = Object.fromEntries(
    inputArray.map((line) => line.split(' -> '))
  );

  const iteration = step(rules, template);

  for (let i = 0; i < 9; i++) {
    iteration.next();
  }

  let [leastCommon, mostCommon] = leastMostCommon(iteration.next().value);

  const part1 = mostCommon - leastCommon;

  for (let i = 10; i < 39; i++) {
    iteration.next();
  }

  [leastCommon, mostCommon] = leastMostCommon(iteration.next().value);

  const part2 = mostCommon - leastCommon;

  return {
    part1,
    part2,
  };
}

function leastMostCommon(s) {
  const freq = frequencies(s);
  const sortedFreq = Object.entries(freq).sort(([, a], [, b]) => a - b);

  const [[, leastCommon], [, mostCommon]] = [
    sortedFreq.shift(),
    sortedFreq.pop(),
  ];

  return [leastCommon, mostCommon];
}

function frequencies(s) {
  return s.split('').reduce((freq, s) => {
    freq[s] = (freq[s] || 0) + 1;
    return freq;
  }, {});
}

/**
 * @param {string} template
 * @returns {string[]}
 * @example pairs('NNCB')
 * //=> ['NN', 'NC', 'CB']
 */
function pairs(template) {
  return template.split('').reduce((pairs, char, index) => {
    if (index < template.length - 1) pairs.push(char + template[index + 1]);
    return pairs;
  }, []);
}

/**
 * @param {{string: string}} rules
 * @param {string} pair
 * @returns {string}
 * @example insert({
 *   CH: 'B',
 *   HH: 'N',
 *   CB: 'H',
 *   NH: 'C',
 *   HB: 'C',
 *   HC: 'B',
 *   HN: 'C',
 *   NN: 'C',
 *   BH: 'H',
 *   NC: 'B',
 *   NB: 'B',
 *   BN: 'B',
 *   BB: 'N',
 *   BC: 'B',
 *   CC: 'N',
 *   CN: 'C',
 * }, 'NN')
 * //=> 'NCN'
 */
function insert(rules, pair) {
  return pair.split('').join(rules[pair]);
}

/**
 * 
 * @param {{string, string}} rules 
 * @param {string} template 
 * @yields {string}
 * @example step({
 *   CH: 'B',
 *   HH: 'N',
 *   CB: 'H',
 *   NH: 'C',
 *   HB: 'C',
 *   HC: 'B',
 *   HN: 'C',
 *   NN: 'C',
 *   BH: 'H',
 *   NC: 'B',
 *   NB: 'B',
 *   BN: 'B',
 *   BB: 'N',
 *   BC: 'B',
 *   CC: 'N',
 *   CN: 'C',
 * }, 'NNCB').next()
 * //=> {
 *   value: 'NCNBCHB',
 *   done: false,
 * }
 */
function* step(rules, template) {
  let t = template;

  while (true) {
    t = pairs(t)
      .map((pair, index) => insert(rules, pair).slice(index === 0 ? 0 : 1))
      .join('');

    yield t;
  }
}

module.exports = {
  solution,
  pairs,
  insert,
  step,
};

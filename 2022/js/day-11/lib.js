import { runInNewContext } from 'node:vm';

/**
 * @typedef Monkey
 * @type {{
 *   items: number[],
 *   operation: string,
 *   test: number,
 *   success: number,
 *   fail: number,
 *   inspects: number
 * }}
 */

/**
 * @param {string} input
 * @returns {Monkey}
 * @example parseMonkey(`
 * Monkey 0:
 *   Starting items: 79, 98
 *   Operation: new = old * 19
 *   Test: divisible by 23
 *     If true: throw to monkey 2
 *     If false: throw to monkey 3
 * `)
 * //=> {
 *   items: [79, 98],
 *   operation: 'old * 19',
 *   test: 23,
 *   success: 2,
 *   fail: 3,
 *   inspects: 0
 * }
 */
export function parseMonkey(input) {
  const [
    itemDefinition,
    operationDefinition,
    testDefinition,
    successDefinition,
    failDefinition,
  ] = input.trim().split('\n').slice(1);

  const items =
    itemDefinition
      .split(': ')
      .pop()
      ?.split(', ')
      .map((n) => Number(n)) ?? [];

  const operation = operationDefinition.split(' = ').pop() ?? '';
  const test = Number(testDefinition.split(' ').pop());
  const success = Number(successDefinition.split(' ').pop());
  const fail = Number(failDefinition.split(' ').pop());

  return {
    items,
    operation,
    test,
    success,
    fail,
    inspects: 0,
  };
}

/**
 * @param {Monkey[]} initialState
 * @param {number=} worryLevelDecrease
 * @yields {Monkey[]}
 */
export function* monkeyIterator(initialState, worryLevelDecrease) {
  let monkeys = structuredClone(initialState);
  const globalFactor = monkeys
    .map((monkey) => monkey.test)
    .reduce((a, b) => a * b);

  while (true) {
    for (const monkey of monkeys) {
      while (monkey.items.length > 0) {
        const old = monkey.items.shift();
        let newWorryLevel = eval(monkey.operation);
        if (worryLevelDecrease) {
          newWorryLevel = (newWorryLevel / worryLevelDecrease) | 0;
        } else {
          newWorryLevel %= globalFactor;
        }

        const destination =
          newWorryLevel % monkey.test === 0 ? monkey.success : monkey.fail;

        monkeys[destination].items.push(newWorryLevel);
        monkey.inspects++;
      }
    }

    yield monkeys;
  }
}

/**
 * @param {Monkey[]} monkeys
 * @param {number} numIterations
 * @param {number=} worryLevelDecrease
 * @returns {number} The product of the two most active monkeys' number of item inspections
 */
export function calculateMonkeyBusinessLevel(
  monkeys,
  numIterations,
  worryLevelDecrease
) {
  let monkeyBusiness;

  for (
    let round = 0, rounds = monkeyIterator(monkeys, worryLevelDecrease);
    round < numIterations;
    round++
  ) {
    monkeyBusiness = rounds.next();
  }

  // @ts-ignore
  const [mostActive, nextMostActive] = monkeyBusiness?.value
    ?.map(({ inspects }) => inspects)
    .sort((a, b) => a - b)
    .slice(-2);

  return mostActive * nextMostActive;
}

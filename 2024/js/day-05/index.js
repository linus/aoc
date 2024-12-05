/**
 * @param {string} input
 * @returns {{part1: number, part2: number}} The solution to parts 1 and 2 of the problem
 * @example solution(`
 * 47|53
 * 97|13
 * 97|61
 * 97|47
 * 75|29
 * 61|13
 * 75|53
 * 29|13
 * 97|29
 * 53|29
 * 61|53
 * 97|53
 * 61|29
 * 47|13
 * 75|47
 * 97|75
 * 47|61
 * 75|61
 * 47|29
 * 75|13
 * 53|13
 *
 * 75,47,61,53,29
 * 97,61,53,29,13
 * 75,29,13
 * 75,97,47,61,53
 * 61,13,29
 * 97,13,75,29,47
 * `)
 * //=> {
 *   part1: 143,
 *   part2: 123,
 * }
 */
export function solution(input) {
  const [pageOrderingRulesInput, updateInput] = input.trim().split('\n\n');

  const pageOrderingRules = pageOrderingRulesInput
    .split('\n')
    .map((line) => line.split('|'))
    .reduce((rules, [before, after]) => {
      rules[before] = rules[before] ?? [];
      rules[before].push(after);
      return rules;
    }, /** @type {Object<string, string[]>} */ ({}));
  const updates = updateInput.split('\n').map((line) => line.split(','));

  const { valid, invalid } = Object.groupBy(updates, (pages) =>
    pages.every(
      (page, index) =>
        !pages
          .slice(index + 1)
          .some((subsequentPage) =>
            pageOrderingRules[subsequentPage]?.includes(page),
          ),
    )
      ? 'valid'
      : 'invalid',
  );

  const corrected = invalid?.map((updates) =>
    updates.sort((a, b) =>
      pageOrderingRules[a]?.includes(b)
        ? 1
        : pageOrderingRules[b]?.includes(a)
          ? -1
          : 0,
    ),
  );

  return {
    part1: (valid ?? [])
      .map((pages) => Number(pages[Math.floor(pages.length / 2)]))
      .reduce((a, b) => a + b),
    part2: (corrected ?? [])
      .map((pages) => Number(pages[Math.floor(pages.length / 2)]))
      .reduce((a, b) => a + b),
  };
}

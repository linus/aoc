/**
 * Parse a string into an array of its letters
 *
 * @param {string} line The string to parse
 * @returns {string[]} The letters in the string
 * @example parseLine('foo')
 * //=> ['f', 'o', 'o']
 */
export function parseLine(line) {
  return line.split('');
}

/**
 * Split an array in parts one and two, in the middle
 *
 * @template T
 * @param {T[]} itemList
 * @returns {T[][]} The first and second half of the string
 * @example parseContents([1, 2, 3, 4])
 * //=> [[1, 2], [3, 4]]
 * @example parseContents(['a', 'b', 'c', 'd'])
 * //=> [['a', 'b'], ['c', 'd']]
 */
export function parseContents(itemList) {
  const len = itemList.length / 2;
  const firstCompartment = itemList.slice(0, len);
  const secondCompartment = itemList.slice(len);
  return [firstCompartment, secondCompartment];
}

/**
 * Find the first common member of the supplied arrays
 *
 * @template T
 * @param {T[][]} param0 The arrays in which to find a common member
 * @returns {T | undefined} The first common member found
 * @example findCommon([['foo', 'bar'], ['foo', 'baz']])
 * //=> 'foo'
 */
export function findCommon([first, ...rest]) {
  return first.find((item) => rest.every((other) => other.includes(item)));
}

/**
 * Return the priority for an item. a-z have priority 1-26, A-Z 27-52.
 *
 * @param {string} item The item to prioritize
 * @returns {number} The item's priority
 * @example getPriority('a')
 * //=> 1
 * @example getPriority('z')
 * //=> 26
 * @example getPriority('A')
 * //=> 27
 * @example getPriority('Z')
 * //=> 52
 */
export function getPriority(item) {
  const ascii = item.charCodeAt(0);

  return ascii > 96 ? ascii - 96 : ascii - 38;
}

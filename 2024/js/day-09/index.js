/**
 * @param {string} input
 * @returns {{part1: number, part2: number}}
 * @example solution('2333133121414131402')
 * //=> {
 *   part1: 1928,
 *   part2: 2858,
 * }
 */
export function solution(input) {
  const diskMap = input
    .trim()
    .split('')
    .map(Number)
    .map((size, index) =>
      index % 2 === 0
        ? Array(size).fill(index / 2)
        : Array(size).fill(undefined),
    );

  let flatDiskMap = diskMap.flat();

  let first = flatDiskMap.findIndex((block) => block === undefined);
  let second = flatDiskMap.findLastIndex((block) => block !== undefined);

  while (first < second) {
    [flatDiskMap[first], flatDiskMap[second]] = [
      flatDiskMap[second],
      flatDiskMap[first],
    ];
    while (flatDiskMap[first] !== undefined) first++;
    while (flatDiskMap[second] === undefined) second--;
  }

  let lastFile = diskMap.findLastIndex((block) => block[0] !== undefined);

  while (diskMap[lastFile][0] > 0) {
    const emptyBlock = diskMap.findIndex(
      (block, index) =>
        index < lastFile &&
        block.filter((cell) => cell === undefined).length >=
          diskMap[lastFile].length,
    );

    if (emptyBlock >= 0) {
      diskMap[emptyBlock].splice(
        diskMap[emptyBlock].findIndex((cell) => cell === undefined),
        diskMap[lastFile].length,
        ...diskMap[lastFile],
      );
      diskMap[lastFile].fill(undefined);
    } else {
      lastFile--;
    }

    while (diskMap[lastFile][0] === undefined) lastFile--;
  }

  const [part1, part2] = [flatDiskMap, diskMap.flat()].map((map) =>
    map
      .map((block, index) => (block !== undefined ? index * block : 0))
      .reduce((a, b) => a + b),
  );

  return {
    part1: part1,
    part2: part2,
  };
}

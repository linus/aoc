import { parseRow } from './lib.js';

/**
 * @param {string} input
 * @returns {{
 *   part1: number,
 *   part2: number
 * }}
 * @example solution(`
 * $ cd /
 * $ ls
 * dir a
 * 14848514 b.txt
 * 8504156 c.dat
 * dir d
 * $ cd a
 * $ ls
 * dir e
 * 29116 f
 * 2557 g
 * 62596 h.lst
 * $ cd e
 * $ ls
 * 584 i
 * $ cd ..
 * $ cd ..
 * $ cd d
 * $ ls
 * 4060174 j
 * 8033020 d.log
 * 5626152 d.ext
 * 7214296 k
 * `)
 * //=> {
 *   part1: 95437,
 *   part2: 24933642
 * }
 */
export function solution(input) {
  const fsMap = new Map();
  let currentPath = [];
  for (const row of input.trim().split('\n')) {
    const result = parseRow(row);
    if (result.command === 'cd') {
      if (result.directory === '..') {
        currentPath.pop();
      } else {
        currentPath.push(result.directory);
      }
    } else if (result.type === 'file') {
      for (let i = 0; i <= currentPath.length; i++) {
        const key = currentPath.slice(0, i).join('/');
        fsMap.set(key, result.file[0] + (fsMap.get(key) || 0));
      }
    }
  }

  const freeSpace = 70_000_000 - fsMap.get('');

  return {
    part1: Array.from(fsMap.values())
      .filter((value) => value <= 100_000)
      .reduce((a, b) => a + b),
    part2: Array.from(fsMap.values())
      .filter((value) => freeSpace + value >= 30_000_000)
      .sort((a, b) => b - a)
      .pop(),
  };
}

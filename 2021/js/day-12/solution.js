/**
 * @param {string} input
 * @returns {{part1: number, part2: null}}
 */
function solution(input) {
  let nodes = input
    .trim()
    .split('\n')
    .map((line) => line.split('-'))
    .reduce((nodes, [from, to]) => {
      nodes.set(from, (nodes.get(from) || new Set()).add(to));
      return nodes;
    }, new Map());

  for (const [from, destinations] of nodes.entries()) {
    if (from !== 'start' && from === from.toLowerCase()) {
      for (const destination of destinations.values()) {
        if (destination !== 'end' && !nodes.has(destination))
          destinations.delete(destination);
      }
    }
  }

  return {
    part1: visit('start', nodes),
    part2: null,
  };
}

function visit(node, nodes) {
  const visited = [];
  const path = [];

  path.push(node);

  if (!nodes.has(node)) return path;

  for (const destination of nodes.get(node).values()) {
    path.push(destination);
    if (destination === 'end') return path;
    else {
      path.push(...visit(destination, nodes));
      if (node === node.toUpperCase()) {
        path.push(node);
      }
    }
  }

  return path;
}

module.exports = {
  solution,
};

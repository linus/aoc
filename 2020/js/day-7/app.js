const bags = [];

function parse (definition) {
  const match = definition.match(/^(.+)\s+bags contain (.*).$/);

  if (match) {
    return {
      type: match[1],
      contents: match[2].startsWith("no") ? null : match[2].split(/,\s*/).map(parseContents),
    }
  }
}

function parseContents (contents) {
  const match = contents.match(/(\d+) (.*) bag/);

  if (!match) return null;

  return [ parseInt(match[1], 10), match[2] ];
}

function invert (bags) {
  return bags.reduce((result, bag) => {
    if (bag.contents)
      bag.contents.forEach(([_, type]) => (result[type] = result[type] || []).push(bag.type));

    return result;
  }, {});
}

function countBags(bagType) {
  console.log('count', bagType);
  const bag = bags.find(b => b.type === bagType);
  console.log('count', bag);

  if (!bag.contents) return 0;

  return bag.contents.reduce((total, [ num, bag ]) => {
    return total + num * (1 + countBags(bag));
  }, 0);
}

process.stdin.on('data', (chunk) => {
  chunk.toString()
    .split('\n')
    .map(parse)
    .filter(b => b ? b : console.error('wat'))
    .map(bag => bags.push(bag));
});

process.stdin.on('end', () => {
  const inverted = invert(bags);

  function find (type) {
    if (!inverted[type]) return null;

    return inverted[type].concat(...inverted[type].map(find).filter(x => x));
  }

  const candidates = find('shiny gold');

  console.log(Array.from(new Set(candidates)).length);

  console.log(countBags('shiny gold'));
});

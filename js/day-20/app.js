const es = require("event-stream")
const reduce = require("stream-reduce")

const tiles = []

process.stdin
  .pipe(es.split('\n\n'))
  .pipe(es.mapSync((data) => {
    const lines = data.trim().split('\n')
    const number = parseInt(lines[0].match(/Tile (\d+):/)[1], 10)
    const tile = lines.slice(1).map((line) => line.replace(/\./g, '0').replace(/#/g, '1'))
    const sides = [
        tile[0],
        tile.map((line) => line[0]).join(''),
        tile.map((line) => line[line.length - 1]).join(''),
        tile[tile.length - 1],
    ]
    return [
      number,
      sides
        .concat(sides.map((side) => side.split('').reverse().join('')))
        .map((side) => parseInt(side, 2))
    ]
  }))
  .on("data", ([ tileNum, sides ]) => tiles.push([tileNum, sides]))
  .on("end", () => console.log(tiles.length, findCorners(tiles).reduce((product, [ tileNum, _ ]) => product * tileNum, 1)))

function findCorners (tiles) {
  return tiles
    .map(([ tileNum, sides ]) => [
        tileNum,
        tiles.filter(([ otherNum, other ]) => tileNum !== otherNum && sides.find((side) => other.includes(side)))
    ])
    .filter(([ _, neighborCandidates ]) => neighborCandidates.length < 3)
}
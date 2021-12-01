const input = process.argv[2]
const cups = input.split('').map(c => parseInt(c))
let turn = 101

while (turn > 0) {
  const [one, two, three] = cups.splice(1, 3)
  let position = cups.findIndex(n => n == cups[0] - 1)
  if (position === -1) {
    const max = Math.max(...cups)
    position = cups.findIndex(n => n === max)
  }
  //console.log(position)
  cups.splice(position + 1, 0, one, two, three)
  //console.log(cups)
  cups.push(cups.shift())
  console.log(cups)
  turn--
}
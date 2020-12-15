let data = [];

process.stdin.on("data", (chunk) => {
  data.push(...chunk.toString().split("\n"));
});

process.stdin.on("end", () => {
  const instructions = data
      .map((i) => i.split(/\s+/))
      .map(([op, arg]) => [op, parseInt(arg, 10)]);

  console.log(processInstructions(instructions));

  console.log(repair(instructions));
});

function repair(instructions) {
  const suspectOperations = ["nop", "jmp"];
  const suspects = instructions
    .map((instruction, i) => [instruction, i])
    .filter(([[operation,],]) => suspectOperations.includes(operation))
    .map(([_, index]) => instructions
      .map(([operation, argument], i) => i !== index
        ? [operation, argument]
        : [suspectOperations[1 - suspectOperations.indexOf(operation)], argument])
    );

  for (const suspect of suspects) {
    const [accumulator, ended] = processInstructions(suspect);

    if (ended) return accumulator;
  }
}

function processInstructions(instructions) {
  let accumulator = 0;
  let position = 0;
  const visited = new Set();

  while(position < instructions.length && !visited.has(position)) {
    visited.add(position);
    const [op, arg] = instructions[position];

    //console.table({acc: accumulator, pos: position, op, arg});

    switch (op) {
      case "jmp":
        position += arg;
        continue;
      case "acc":
        accumulator += arg;
      case "nop":
      default:
        position++;
    }
  }

  return [accumulator, position === instructions.length];
}

let data = ''

process.stdin.on('data', (chunk) => data += chunk.toString().trim())

process.stdin.on('end', () => {
    const startingNumbers = data.split(',').map(s => parseInt(s, 10))
    let turn = 0;
    for (const item of memoryGame(startingNumbers)) {
        if (30e6 == ++turn) {
            console.log(item);
            break;
        }
    }
})

function *memoryGame(startingNumbers) {
    let count = 0
    let last = startingNumbers[0]
    let lastPosition = {}

    while(true) {
        const num = count < startingNumbers.length
            ? startingNumbers[count]
            : last in lastPosition
            ? count - lastPosition[last]
            : 0

        yield num

        lastPosition[last] = count++
        last = num
    }
}
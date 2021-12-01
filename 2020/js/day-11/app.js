const deepEqual = require('deep-equal')

const rows = []

process.stdin.on('data', (chunk) => {
    rows.push(
        ...chunk
            .toString()
            .trim()
            .split('\n')
            .map(l => l.split(''))
    )
})

process.stdin.on('end', () => {
    console.log(solve(rows, step(rule1)))
})

function rule1 (rows, rowIndex, seatIndex, seat) {
    const seatEmpty = seat === 'L'
    const seatOccupied = seat === '#'
    const occupiedSeats = countOccupied(adjacent(rows, rowIndex, seatIndex))

    return seatEmpty && occupiedSeats === 0
        ? '#'
        : seatOccupied && occupiedSeats >= 4
        ? 'L'
        : seat
}

function rule2 (rows, rowIndex, seatIndex, seat) {
    const seatEmpty = seat === 'L'
    const seatOccupied = seat === '#'
    const occupiedSeats = countOccupied(visible(rows, rowIndex, seatIndex))

    return seatEmpty && occupiedSeats === 0
        ? '#'
        : seatOccupied && occupiedSeats >= 5
        ? 'L'
        : seat
}

function solve (rows, step) {
    let steps = 0
    let previousStep = rows;
    let nextStep = step(rows);

    while (!deepEqual(previousStep, nextStep)) {
        steps++
        previousStep = nextStep
        nextStep = step(nextStep)
    }

    console.debug([previousStep, steps])

    return previousStep.reduce((numOccupied, row) => numOccupied + countOccupied(row), 0);
}

function countOccupied (seats) { return seats.filter(s => s === '#').length }

function adjacent (rows, rowIndex, seatIndex) {
    const prevRow = rows[rowIndex - 1] || []
    const nextRow = rows[rowIndex + 1] || []
    const currRow = rows[rowIndex]

    return [
        prevRow[seatIndex - 1], prevRow[seatIndex], prevRow[seatIndex + 1],
        currRow[seatIndex - 1],                     currRow[seatIndex + 1],
        nextRow[seatIndex - 1], nextRow[seatIndex], nextRow[seatIndex + 1],
    ].filter(c => !!c)
}

// TODO Fix this for part 2
function visible (rows, rowIndex, seatIndex) {
    return rows.map((row, currentRowIndex) => row.map((seat, currentSeatIndex) => {
        if (inLine([rowIndex, seatIndex], [currentRowIndex, currentSeatIndex])) {}
    }))
}

function inLine ([r1, c1], [r2, c2]) {
    return r1 === r2
        || c1 === c2
        || r1 - r2 === c1 - c2
}

function step (visibilityRule) {
    return (rows) => rows.map((row, rowIndex) => row.map((seat, seatIndex) => visibilityRule(rows, rowIndex, seatIndex, seat)))
}
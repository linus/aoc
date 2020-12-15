const instructions = []
process.stdin.on('data', (chunk) => {
    instructions.push(...chunk.toString().trim().split('\n'))
})

process.stdin.on('end', () => {
    let mask = null
    let memory = []

    for (const instruction of instructions) {
        const [right, left] = instruction.split(/\s*=\s*/)

        if (right === 'mask') {
            mask = processMask(left)
            console.debug('mask', mask)
        } else {
            const location = parseInt(right.match(/\[(\d+)\]/)[1], 10)
            memory[location] = applyMask(mask, parseInt(left))
            console.debug('mem', location, memory[location])
        }
    }

    console.log(memory.reduce((sum, n) => sum + n, 0))
})

function processMask(mask) {
    return mask
        .split('')
        .reverse()
        .map((c, i) => [c, i])
        .filter(([c,]) => c !== 'X')
        .map(([c, i]) => [c, 2 ** i])
}

function applyMask(mask, num) {
    const operations = {
        0: (a, b) => a & ~b,
        1: (a, b) => a | b
    }

    return mask.reduce((n, [c, i]) => operations[c](n, i), num)
}
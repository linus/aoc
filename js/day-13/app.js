let data = null

process.stdin.on('data', (chunk) => {
    data = chunk.toString()
})

process.stdin.on('end', () => {
    const [_, busData] = data.trim().split('\n')
    const buses = busData.split(',')
    let solution = 0;

    for (let i = 0; solution === 0; i++) {
        const times = buses
            .map(b => {
                if (b === 'x') return null
                const t = parseInt(b, 10)
                return t - i % t
            })

        if (times.every((t, index) => t === null || t === index + 1)) solution = i + 1
    }

    console.log(solution)
})

//process.stdin.on('end', () => {
//    const [timestampData, busData] = data.trim().split('\n')
//    const timestamp = parseInt(timestampData, 10)
//    const buses = busData
//        .split(',')
//        .filter(b => b !== 'x')
//        .map(b => parseInt(b, 10))
//        .map(b => [b - timestamp % b, b])
//        .sort(([tA, a], [tB, b]) => tA - tB)
//
//    const [waitTime, busID] = buses[0]
//
//    console.log(waitTime * busID)
//})
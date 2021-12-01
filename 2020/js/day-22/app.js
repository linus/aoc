let buffer = ''

process.stdin.on('data', (chunk) => buffer += chunk.toString())

process.stdin.on('end', () => {
    const [player1, player2] = getPlayers(buffer)
    
    while (player1.length && player2.length) {
        turn([player1, player2])
    }

    const winner = player1.length ? player1 : player2

    console.log(calculateScore(winner))
})

function calculateScore(player) {
    return player.reduceRight((score, card, index) => score + card * (player.length - index), 0)
}

function turn([player1, player2]) {
    const card1 = player1.shift()
    const card2 = player2.shift()

    if (card1 > card2) player1.push(card1, card2)
    else if (card2 > card1) player2.push(card2, card1)
}

function getPlayers (str) {
    const [player1, player2] = str.split('\n\n').map(s => s.split('\n'))

    return [
        player1.slice(1).map(s => parseInt(s.trim(), 10)),
        player2.slice(1).map(s => parseInt(s.trim(), 10)),
    ]
}
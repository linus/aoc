data = ''

process.stdin.on('data', chunk => data += chunk.toString().trim())

process.stdin.on('end', () => {
    const [ruleDefinitions, messages] = data.split('\n\n', 2)

    const rules = parseRules(ruleDefinitions)

    console.log(compileRule(rules[1], rules))
})

function parseRules (ruleDefinitions) {
    return ruleDefinitions.split('\n').reduce((rules, definition) => {
        const [index, rule] = definition.split(/:\s*/)
        rules[+index] = rule
        return rules
    }, [])
}

function compileRules (rules) {
    return rules.reduce((re, rule) => re + compileRule(rule, rules), "")
}

function compileRule (rule, rules) {
    const match = rule.match(/^"(\w+)"$/)
    console.log("C", rule, match)
    if (match) return [match[1]]

    return rule
        .split(/\s*\|\s*/)
        .map((part) => part.split(/\s+/).reduce((re, n) => compileRule(rules[+n], rules).map(rule => re + rule).join("|"), ""))
}
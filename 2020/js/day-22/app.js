let buf = ''

process.stdin.on('data', (chunk) => {
  buf += chunk.toString()
})

process.stdin.on('end', () => {
  const foods = parse(buf)
  const allergens = findAllergens(foods)
  const allAllergens = new Set(Object.values(allergens).map(a => Array.from(a)).flat())

  console.log(part1(foods, allAllergens))
  console.log(part2(allergens))
})

function part1(foods, allergens) {
  return foods.reduce((count, [ingredients, _]) => {
    return count + difference(ingredients, allergens).size
  }, 0)
}

function part2(allergens) {
  const resolvedAllergens = {}

  while (Object.entries(allergens).length > 0) {
    for (const [allergen, ingredients] of Object.entries(allergens)) {
      if (ingredients.size === 1) {
        resolvedAllergens[Array.from(ingredients)[0]] = allergen
        delete allergens[allergen]
      } else {
        allergens[allergen] = difference(ingredients, new Set(Object.keys(resolvedAllergens)))
      }
    }
  }

  return Object.entries(resolvedAllergens)
    .sort(([, a], [, b]) => a.localeCompare(b))
    .map(([ingredient, ]) => ingredient)
    .join(",")
}

function findAllergens (foods) {
  return foods.reduce((resolvedAllergens, [ingredients, allergens]) => {
    for (const allergen of allergens) {
      resolvedAllergens[allergen] = allergen in resolvedAllergens
        ? intersection(resolvedAllergens[allergen], ingredients)
        : ingredients
    }
    return resolvedAllergens
  }, {})
}

function difference (a, b) {
  let diff = new Set(a)
  for (const elem of b) {
    diff.delete(elem)
  }
  return diff
}

function intersection (a, b) {
  let insect = new Set()
  for (const elem of b) {
    if (a.has(elem)) insect.add(elem)
  }
  return insect
}

function parse (input) {
  return input.trim()
    .split('\n')
    .map(line => line.split(" (contains "))
    .map(([ingredients, allergens]) => [
      new Set(ingredients.split(' ')),
      new Set(allergens ? allergens.split(')')[0].split(", ") : null)
    ])
}

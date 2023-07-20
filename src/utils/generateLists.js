const COLORS = [
  '#ff0000',
  '#00ff00',
  '#0000ff',
  '#ffff00',
  '#00ffff',
  '#ff00ff',
  '#7f0000',
  '#007f00',
  '#00007f',
  '#7f007f'
]

export function generateLists() {
  // const count = randomIntInclusive(5, 10)
  const count = 5
  const result = []

  for (let i = 0; i < count; i++) {
    result.push({ id: i, name: `List ${i + 1}`, items: generateItems() })
  }

  return result
}

function generateItems() {
  const count = randomIntInclusive(4, 10)
  const result = []

  for (let i = 0; i < count; i++) {
    result.push({
      id: i,
      name: `Item ${i + 1}`,
      selected: randomBoolean(7),
      color: COLORS[i],
      count: randomIntInclusive(0, 40)
    })
  }

  return result
}

function randomBoolean(probability) {
  return randomIntInclusive(0, 10) < probability
}

function randomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

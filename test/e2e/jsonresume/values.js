const getValues = (value) => {
  if (Array.isArray(value)) {
    return value.flatMap(getValues)
  }

  if (typeof value !== 'object' || value === null) {
    return []
  }

  const values = Object.values(value)
  const result = []

  for (const element of values) {
    if (typeof element === 'string') {
      result.push(element)
    } else {
      result.push(...getValues(element))
    }
  }

  return result
}

for (const x of getValues(require('./document.json'))) {
  console.log(x.length, x)
}

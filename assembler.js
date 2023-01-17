const assCode = ['in', 'to', 'fr', 'add', 'sub', 'if', 'prt', '**', 'end']

function parseAssembler (text) { // eslint-disable-line no-unused-vars
  // console.log(text)
  const lines = text.split('\n')
  // console.log(lines)
  const trimmed = lines.map((x) => x.trim())
  // console.log(trimmed)
  const separated = trimmed.map((x) => x.split(' '))
  // console.log(...separated)
  separated.forEach((e, i) => { if (e.length > 2) console.log('to many words', e, i) })
  const replaced = separated.map(([com, val]) => [assCode.indexOf(com), Number(val)])
  // console.log(...replaced)

  return replaced
}

function advancedAssembler (text) { // eslint-disable-line no-unused-vars
  const variables = ['cat']

  const lines = text.split('\n')

  const trimmed = lines.map((x) => x.trim())

  const separated = trimmed.map((x) => x.split(' '))
  console.log(...separated)

  separated.forEach((e, i) => { if (e.length > 2) console.log('to many words', e, i) })

  const replaced = []
  separated.forEach((v, i, a) => {
    const [com, val] = v
    if (assCode.indexOf(com) + 1) {
      const value = variables.indexOf(val) + 1 ? variables.indexOf(val) : Number(val)
      replaced.push([assCode.indexOf(com), value])
    } else if (com === 'def') {
      variables.push(val)
    } else if (variables.indexOf(com) + 1) {
      replaced.concat([0, Number(val)], [1, variables.indexOf(com)])
    } else if (com === 'mult') {
      // muliply memory by accumulator
      // let multCode = [['def', 'stack'], ['def', 'store'], ['to', 'stack'], ]
    }
    //  {return [assCode.indexOf(com), Number(val)]}
  })
  console.log('hi', ...replaced, variables)

  return replaced
}

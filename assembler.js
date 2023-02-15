const assCode = ['in', 'to', 'fr', 'add', 'dec', 'if', 'prt', 'goto', 'end']

const splitText = (x) => x.split('\n').map((x) => x.trim()).map((x) => x.split(' '))

const simpleAssembler = (x) => x.map(([com, val]) => [assCode.indexOf(com), Number(val)])

function advancedAssembler (separated) { // eslint-disable-line no-unused-vars
  const variables = ['r0', 'r1', 'r2']
  const labels = []
  const replaced = []

  separated.forEach((v, i, a) => {
    const [com, val] = v
    if (assCode.indexOf(com) !== -1) {
      const value = variables.indexOf(val) + 1 ? variables.indexOf(val) : Number(val)
      replaced.push([assCode.indexOf(com), value])
    } else if (com === 'def') {
      variables.push(val)
    } else if (com === 'label') {
      labels.push([val, replaced.length])
    } else if (com === 'jmp') {
      replaced.push(['jmp', val])
    } else if (com === 'jif') {
      replaced.push(['jif', val])
    } else { console.log('command not found', v) }
  })

  const substituted = replaced.map(([com, val]) => {
    if (com === 'jmp') return [7, Number(labels.filter(x => x[0] === val)[0][1])]
    else if (com === 'jif') return [5, Number(labels.filter(x => x[0] === val)[0][1])]
    else return [com, val]
  })

  console.log('compiled machnie code:', 'r', replaced, 's', substituted, 'v', variables, 'l', labels)

  return substituted
}

function bLang (separated) {
  const replaced = []

  separated.forEach((v, i, a) => {
    const [com, ...vals] = v
    if (com === 'inc') {
      replaced.push(['to', 'r0'], ['in', 1], ['add', vals[0]], ['to', vals[0]], ['fr', 'r0'])
    } if (com === 'mult') {
      replaced.push(['to', 'r0'], ['fr', 1], ['add', vals[0]], ['to', vals[0]], ['fr', 'r0'])
    } else {
      replaced.push([com, ...vals])
    }
  })
  console.log('compiled B code:', replaced)

  return replaced
}

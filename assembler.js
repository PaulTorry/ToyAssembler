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

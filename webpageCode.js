/* eslint-disable no-multiple-empty-lines, no-unused-vars */
/* global SimpleComputer, advancedAssembler, splitText, logToConsole, localStorage, examples */

const comp = new SimpleComputer()
let currentSave = 99

function getDataAndRun () {
  const numberOfEntryLines = 9
  const instructions = []
  for (let i = 0; i < numberOfEntryLines; i++) {
    instructions.push([
      Number(document.getElementById((i) + 'A').value),
      Number(document.getElementById((i) + 'B').value)
    ])
  }
  // console.log(instructions);
  const result = comp.run(instructions)
  document.getElementById('output').innerHTML = result
}

function getAssemblerAndRun () {
  const text = document.getElementById('assemblertext').value
  // const code = advancedAssembler(splitText(text))
  // const code = assembler(splitText(text))
  code = splitText(text)
  console.log(code)
  const result = comp.run(code, logToConsole)
  document.getElementById('assembleroutput').innerHTML = result
}

function clearMem () { localStorage.saves = [] }

function load (what = 0) {
  // console.log( localStorage.saves)
  const saves = JSON.parse(localStorage.saves)
  let saveToLoad = 0
  if (what) { saveToLoad = Math.max(Math.min(currentSave + what, saves.length - 1), 0); currentSave = saveToLoad } else { saveToLoad = saves.length - 1; currentSave = saveToLoad }

  console.log(saveToLoad)
  document.getElementById('assemblertext').value = JSON.parse(saves[saveToLoad])
}

function save () {
  const saves = (localStorage.saves) ? JSON.parse(localStorage.saves) : []
  // console.log(saves);
  const text = document.getElementById('assemblertext').value
  saves.push(JSON.stringify(text))
  currentSave = saves.length
  localStorage.saves = JSON.stringify(saves)
  console.log(JSON.parse(localStorage.saves))
}

function loadExample (name) {
  console.log(examples[name])
  document.getElementById('assemblertext').value = JSON.parse(examples[name])
}

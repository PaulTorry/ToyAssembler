/* eslint-disable no-multiple-empty-lines, no-unused-vars */

function formatDebugForConsole (debug) {
  const pad = x => x.toString().padStart(3, ' ')

  const { totalOps, lastOp, nextOp, command, value, accumulator, memory } = debug

  return pad(totalOps) + ' ' + pad(lastOp) + '->' + pad(nextOp) +
  '  [' + pad(command) + ',' + pad(value) + ']   (' + pad(accumulator) +
     ' )[' + memory.map(pad).toString() + ']'
}

function logToConsole (debug) {
  console.log(formatDebugForConsole(debug))
}

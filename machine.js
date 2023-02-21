/* eslint-disable no-multiple-empty-lines, no-unused-vars */

class SimpleComputer {
  constructor (memSize = 5) {
    this.mem = new Array(memSize)
    this.printed = []
    this.instructionMem = [[6, 0]] //                             @TODO
    this.currentOp = 0
    this.totalOps = 0
    this.running = false
    this.acc = 0
    this.ops = [
      (x) => { this.acc = x }, //                              000         0      inp   (input (x) to accumulator)
      (x) => { this.mem[x] = this.acc }, //                    001         1      sto   (store accumulator (x) to memory)
      (x) => { this.acc = this.mem[x] }, //                    010         2      ret   (retrive memory (x) to accumulator)
      (x) => { this.acc = this.mem[x] + this.acc }, //         011         3      add   (add memory to accumulator)
      (x) => { this.mem[x] = this.mem[x] - 1 }, //             100         4      dec   (decrement memory at x)
      (x) => { if (!this.acc) this.currentOp = x - 1 }, //     101         5      cjp   (conditional jump)   @TODO
      (x) => { this.currentOp = x - 1 }, //                    110         6      jmp   (jmp)
      (x) => { console.log('command 7 reserved') }, //         111         7          --- reserved ---
      (x) => { this.print(x || this.acc) }, //                             8      prt   (virtual machine returns at end)
      (x) => { this.running = false; if (x) this.print(x) } //             9      end   (virtual machine ends )
    ]
  }

  run (instructions = [[6, 2], [8, 0]], debug = () => {}, maxOps = 50) {
    const pad = x => x.toString().padStart(3, ' ')
    this.currentOp = 0
    this.totalOps = 0
    this.printed = ''
    this.instructionMem = instructions
    this.running = true
    while (this.running && this.totalOps < maxOps) {
      const [com, val] = this.instructionMem[this.currentOp]
      const thisOp = this.currentOp
      this.ops[com](val)
      debug({ totalOps: this.totalOps, lastOp: thisOp, nextOp: (this.currentOp + 1), command: com, value: val, accumulator: this.acc, memory: this.mem })
      this.currentOp++
      this.totalOps++
    }
    return this.printed
  }

  print (x) {
    this.printed = this.printed.concat([' | ' + x])
  }
}

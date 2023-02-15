/* eslint-disable no-multiple-empty-lines, no-unused-vars */




class simpleComputer {
  constructor (memSize = 5) {
    this.mem = new Array(memSize)
    this.printed = []
    this.instructionMem = [[6, 0]]
    this.currentOp = 0
    this.totalOps = 0
    this.running = false
    this.acc = 0
    this.ops = [
      (x) => { this.acc = x }, //                                      in  0      inp
      (x) => { this.mem[x] = this.acc }, //                            to  1      sto
      (x) => { this.acc = this.mem[x] }, //                            fr  2      ret
      (x) => { this.acc = this.acc + this.mem[x] }, //                 add 3      add
      (x) => { this.mem[x] = this.mem[x] - 1 }, //                     dec 4      dec
      (x) => { if (!this.acc) this.currentOp = x - 1 }, //             to  5      cjp
      (x) => { this.print(x || this.acc) }, //                         fr  6      jmp
      (x) => { this.currentOp = x - 1 }, //                            goto 7     prt
      (x) => { this.running = false } //                               end 8
    ]
  }

  run (instructions = [[6, 2], [8, 0]], debug = () => {}) {
    const pad = x => x.toString().padStart(3, ' ')
    this.currentOp = 0
    this.totalOps = 0
    this.printed = ''
    this.instructionMem = instructions
    this.running = true
    while (this.running && this.totalOps < 40) {
      // debug('running', this.currentOp, this.instructionMem[this.currentOp], this.running)
      const [com, val] = this.instructionMem[this.currentOp]
      const thisOp = this.currentOp
      // debug(this.totalOps, ' ', this.currentOp, '[', op, ', ', on, ']')
      this.ops[com](val)
      // debug(pad(this.totalOps), ' ', pad(thisOp) + '->' + pad(this.currentOp + 1), '  [' + pad(op) + ',' + pad(on) + '] Mem [(' + pad(this.acc) + ') ' + this.mem.toString() + ']')
      debug({ totalOps: this.totalOps, lastOp: thisOp, nextOp: (this.currentOp + 1), command: com, value: val, accumulator: this.acc, memory: this.mem })

      this.currentOp++
      this.totalOps++
    }
    // console.log(this.printed)
    return this.printed
  }

  print (x) {
    // console.log(' mPprinting', x)
    this.printed = this.printed.concat(['|  ' + x])
  }
}

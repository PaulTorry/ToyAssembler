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
      (x) => { this.acc = x }, //                                      in  0
      (x) => { this.mem[x] = this.acc }, //                            to  1
      (x) => { this.acc = this.mem[x] }, //                            fr  2
      (x) => { this.acc = this.acc + this.mem[x] }, //                 add 3
      (x) => { this.acc = this.acc - this.mem[x] }, //                 sub 4
      (x) => { if (!this.acc) this.currentOp = x - 1 }, //             to  5
      (x) => { this.print(x || this.acc) }, //                         fr  6
      (x) => { console.log('mError command unknown') }, //             res 7
      (x) => { this.running = false; this.print('mEnd code:' + x) } // end 8
    ]
  }

  run (instructions = [[6, 2], [8, 0]], debug = () => {}) {
    this.currentOp = 0
    this.totalOps = 0
    this.instructionMem = instructions
    this.running = true
    while (this.running && this.totalOps < 20) {
      //  console.log('running', this.currentOp, this.running)
      const [op, on] = this.instructionMem[this.currentOp]
      debug(' mDebug step:', this.totalOps, 'line:', this.currentOp, 'op:', op, 'on:', on)
      this.ops[op](on)
      debug('    mDebug:line:', this.currentOp, 'acc', this.acc, 'mem', this.mem.toString())
      this.currentOp++
      this.totalOps++
    }
    // console.log(this.printed)
    return this.printed
  }

  print (x) {
    // console.log(' mPprinting', x)
    this.printed = this.printed.concat(['| op ' + this.currentOp + 'val ' + x])
  }
}

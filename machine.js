




























































class simpleComputer {
  constructor (memSize = 5) {
    this.mem = new Array(memSize)
    this.printed = []
    this.instructionMem = [[6, 0]]
    this.currentOp = 0
    this.running = false
    this.acc = 0
    this.ops = [
      (x) => { this.acc = x }, //                          in 0
      (x) => { this.mem[x] = this.acc }, //                to 1
      (x) => { this.acc = this.mem[x] }, //                fr 2
      (x) => { this.acc = this.acc + this.mem[x] }, //     add 3
      (x) => { this.acc = this.acc - this.mem[x] }, //     sub 4
      (x) => { if (!this.acc) this.currentOp = x }, //      to 5
      (x) => { this.print(this.acc) }, //                   fr 6
      (x) => { console.log('Error command unknown') }, //   res 7
      (x) => { this.running = false; this.print('End code:' + x) } //                  fr 8
    ]
  }

  run (instructions = [[6, 2], [8, 0]], debug = console.log) {
    this.instructionMem = instructions
    this.running = true
    while (this.running) {
      const [op, on] = this.instructionMem[this.currentOp]
      this.ops[op](on)
      debug('i', this.currentOp, 'op', op, 'on', on, this.acc, this.mem[0])
      this.currentOp++
    }
    return this.printed
  }

  print (x) {
    console.log(x)
    this.printed = this.printed.concat([[this.currentOp, x]])
  }
}
/* eslint-disable no-multiple-empty-lines, no-unused-vars */

const examples = {
  bMult: '"  inp 5  \\n  sto r0\\n  inp 0\\n  sto r1\\n  inp 3\\n  sto r2\\n  \\n  label looper\\n  ret r2\\n  goif done\\n  ret r1\\n  add r0\\n  sto r1\\n  dec r2  \\n  goto looper\\n  \\n  label done\\n  ret r1\\n  prt \\n  end \\n    "',
  aLoop: '"label moo \\ndefn tot\\ndefn loop\\ndefn mand\\ndefn mer\\ninp 3  \\nsto mer\\nsto loop\\ninp 5\\nsto mand\\nsto tot\\n\\ndec loop\\nret loop\\nprt\\ngoto moo\\n\\nend 0\\n    "',
  mAdd: '"  0 3\\n  1 0\\n  3 0\\n  8 0\\n  9 0\\n    "'
}

import fs from 'fs'
import execute from './index.js'

let txtL = fs.readFileSync('./parseL.amb', 'utf-8')
console.log(execute(txtL, 'transpile'))

// let txtA = fs.readFileSync('./parseA.amb', 'utf-8')
// let ll = execute(txtA, 'compile')
// fs.writeFileSync('./out.ll', ll, 'utf-8')
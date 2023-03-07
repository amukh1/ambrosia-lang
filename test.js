import fs from 'fs'
import execute from './index.js'

let txt = fs.readFileSync('./parse.amb', 'utf-8')
execute(txt)
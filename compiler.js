import module from './llvmr.js'
import parse from './parser.js'
import Lexer from './tokenizer.js'
import fs from 'fs'

function compile(parsee) {
  let mod = new module
  let final = []
  parsee.forEach((x) => {
    if (x.type == 'import') {
      let p = importst(x)
      let l = new Lexer(p)
      final.push(compile(parse(l.Tokenize())))
    }
    else
      if (x.type == 'fun') {
        // console.log(x)
        let ll = mod.function(x.name.value, 'i32', x.params, compile(x.body))
        final.push(ll)
      }
      else
        if (x.type == 'funcCALL') {
          final.push(mod.funcCall(x.value, 'i32', x.data))
        }
        else if (x.type == 'exp' && x.data[0] && x.data[0].type == 'WORD' && x.data[0].value == 'return') {
          let bt = '%';
          if (x.data[2].type == 'STRING' || x.data[2].type == 'NUMBER') bt = ''
          final.push(`ret ${x.data[1].value} ${bt}${x.data[2].value}`)
        } else if (x.type == 'IRExp') {
          final.push(x.data.value.slice(1, -1))
        }
  })
  return final.join('\n')
}

function importst(parsee) {
  let p = fs.readFileSync(`./packages/${parsee.value}.amb`, 'utf-8')
  return p
}

export default compile
import parse from './parser.js'
import Lexer from './tokenizer.js'
import fs from 'fs'


export default function transpile(parsee) {
  let final = []
  parsee.forEach((x, y) => {
    if (x.type == 'dec') {
      final.push(dec(x))
    } else if (x.type == 'fun') {
      final.push(func(x))
    } else if (x.type == 'redec') {
      final.push(redec(x))
    } else if (x.type == 'funcCALL') {
      final.push(funcCALL(x))
    } else if (x.type == 'exp') {
      final.push(expression(x))
    } else if (x.type == 'luaExp') {
      final.push(x.data.value.slice(1, -1))
    } else if (x.type == 'import') {
      let lexer = new Lexer(importst(x))
      final.push(transpile(parse(lexer.Tokenize())))
    }
  })
  return final.join("\n")
}

function func(parsee) {
  let args = []
  // console.log(parsee.params)
  parsee.params.forEach((x) => {
    args.push(x.value)
  })
  return `
  function ${parsee.name.value}(${args.join(',')}) 
    ${transpile(parsee.body)}
  end
  `
}

function importst(parsee) {
  let p = fs.readFileSync(`./packages/${parsee.value}.amb`, 'utf-8')
  return p
}

function dec(parsee) {
  return `local ${parsee.value.value} = ${transpile(parsee.data)}`
}

function redec(parsee) {
  return `${parsee.value.value} = ${transpile(parsee.data)}`
}

function funcCALL(parsee) {
  let p = []
  // console.log('parseedata', parsee.data)
  parsee.data.forEach((beh) => {
    // console.log(beh)
    p.push((beh.value))
  })
  // console.log('p',p)
  return `${parsee.value.value}(${p.join(' ')})`
}

function expression(parsee) {
  // if (parsee.data[0].type == 'STRING') {
  //   let eee = []
  //   parsee.data.forEach((y) => {
  //     eee.push(y.type == "STRING" ? '"' + y.value + '"' : y.value)
  //   })
  //   return eee.join(" ")
  // } else if (parsee.data[0].type == 'WORD') {
  //    let eee = []
  //   parsee.data.forEach((y) => {
  //     eee.push(y.value)
  //   })
  //   return eee.join(" ")
  // } else if(parsee.data[])

  let eee = []
  parsee.data.forEach((y) => {
    eee.push(y.value)
  })
  return eee.join(" ")
}
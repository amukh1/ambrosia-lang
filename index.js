import fs from 'fs'
import Lexer from './tokenizer.js'
import parse from './parser.js'
import transpile from './transpiler.js'
import compile from './compiler.js'
import luainjs from 'lua-in-js'


const luaEnv = luainjs.createEnv({})

// const luaScript = luaEnv.parse('print(\'Hello world!\')')
// const returnValue = luaScript.exec()
// console.log(returnValue)

// let txt = fs.readFileSync('./parse.amb', 'utf-8')
// let lexer = new Lexer(txt)

// console.log(lexer.Tokenize())

// let re = parse(lexer.Tokenize())

// console.log(re)

// fs.writeFileSync('./out.json', JSON.stringify({ head: 'Ambrosia.program', body: re }), 'utf-8')
// fs.writeFileSync('./out.lua', transpile(re), 'utf-8');

// console.log(transpile(re))

// const luaScript = luaEnv.parse(transpile(re))
// const returnValue = luaScript.exec()

export default function execute(r, t) {
if(t == 'transpile') {
    let lexer = new Lexer(r)
    let lua = transpile(parse(lexer.Tokenize(),'lua'))
    const luaScript = luaEnv.parse(lua)
    const returnValue = luaScript.exec()
    return returnValue
}else {
    let lexer = new Lexer(r)
    let ll = compile(parse(lexer.Tokenize(),'llvm'))
    return ll
}
}
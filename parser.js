import fs from 'fs'

let llvm = 'llvm'
let lu = 'lua'

export default function parse(tokens, typex) {
  if (tokens.length == 1) {
    return [new expression('exp', 'exp', [tokens[0]])]
  }
  let i = 0
  let final = []
  while (i < tokens.length) {
    // console.log(tokens[i])
    if (tokens[i].type == 'WORD' && tokens[i].value == 'import') {
      final.push(new importst('import', tokens[i + 1].value, [tokens[i + 1]]))
      i += 2
    }
    else if (tokens[i].type == 'EXPI') {
      // console.log('expi')
      let j = i + 1
      let r = []
      while (true) {
        if (tokens[j].type == 'EXPI') break;
        r.push(tokens[j])
        j++
      }
      i = j + 1
      // console.log('eeee',r)
      final.push(new expression('exp', 'exp', r))
    } else
      if (tokens[i].value == 'fun' && tokens[i].type !== 'STRING') {
        let params = []
        let j
        if(typex == 'llvm'){ j = i+4 } else {j = i+3}
        
        let b = false
        while (true) {
          if (tokens[j].type == 'C-PAREN') break;
          if (tokens[j].type == 'COMMA') { j++; continue; }
          if(typex == llvm) {
                      params.push({ ...tokens[j + 1], rtype: tokens[j] })
          j += 2
            continue
          } else {
            params.push(tokens[j])
          j++
          }
        }
        // console.log(params)
        let body = []
        b = false
        j += 2
        while (b == false) {
          // console.log(tokens[j])
          if (tokens[j].type == "C-BRACE") break;
          body.push(tokens[j])
          j++
        }
        let f;
        if(typex == llvm) {
          f = new func('fun', tokens[i + 2], { body: parse(body), params, rtype: tokens[i + 1] })
        }else {
          f = new func('fun', tokens[i + 1], { body: parse(body), params})
        }
        
        // console.log(f)
        final.push(f)
        i = j
      } else if (tokens[i].type == 'WORD' && tokens[i + 1] && tokens[i + 1].type == 'O-PAREN') {
        let data = []
        let name = tokens[i]
        let j = i + 2
        while (true) {
          if (tokens[j].type == 'C-PAREN') break;
          // if (tokens[j].type == 'COMMA') { j++; continue; }
  if(typex == llvm) {
             data.push({ ...tokens[j + 1], rtype: tokens[j] })
              j += 2
  }else {
             data.push({ ...tokens[j]})
              j += 1
  }
 
          // data.push(tokens[j])

        }
        // console.log(data)
        i = j + 1
        let f = new funcCALL('funcCALL', name,(data))
        // console.log(f)
        final.push(f)
      }
      else if (tokens[i].value == 'let' && tokens[i].type !== 'STRING') {
        let n = tokens[i + 1]
        let v = []
        let j = i + 3
        while (true) {
          if (tokens[j].type == 'SEMI') break
          v.push(tokens[j])
          j++
        }
        let varib = new dec('dec', n, parse(v))
        final.push(varib)
        i = (j)
      }
      else if (tokens[i + 1] && tokens[i + 1].type == 'DECLARATION') {
        let n = tokens[i]
        let v = []
        let j = i + 2
        while (true) {
          if (tokens[j].type == 'SEMI') break
          v.push(tokens[j])
          j++
        }
        final.push(new redec('redec', n, parse(v)))
        i = j
      } else if (tokens[i].type == 'EOF') {
        break
        i++
      } else if (tokens[i].type == "WORD" && tokens[i].value == 'LUA') {
        // console.log('lua')
        // console.log(tokens[i+2])
        final.push(new lua('luaExp', 'luaExp', tokens[i + 2]))
        i += 4
      }
      else if (tokens[i].type == "WORD" && tokens[i].value == 'IR') {
        // console.log('lua')
        // console.log(tokens[i+2])
        final.push(new lua('IRExp', 'IRExp', tokens[i + 2]))
        i += 4
      }
      // else if(tokens[i].type == 'WORD' && tokens[i].value == 'return') {
      //   final.push(new returnst('returnst', tokens[i+1], []))
      //   i+=3
      // }
      else {
        // console.log('e')
        let v = []
        let j = 0
        for (var d = i; d < tokens.length; d++) {
          if (tokens[d].type == 'SEMI' || tokens[d].type == 'EXPI') break;
          // console.log(tokens[d])
          v.push(tokens[d])
          j++
        }
        final.push(new expression('exp', 'exp', (v)))
        i += j
      }
    i++
  }
  return final
}

class type {
  constructor(type, value, data) {
    this.type = type
    this.value = value
    this.data = data
  }

  classify() {
    return 'nullset'
  }
}

class funcCALL extends type {
  constructor(type, value, data) {
    super(type, value, data)
  }
}

class importst extends type {
  constructor(type, value, data) {
    super(type, value, data)
  }
}

class literal extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.literal = data.literal
  }
}

class func extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.name = value
    this.body = data.body
    this.params = data.params
  }
}

class returnst extends type {
  constructor(type, value, data) {
    super(type, value, data)
  }
}

class dec extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.type = type
    this.data = data
    this.value = value
  }
}

class redec extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.type = type
    this.data = data
    this.value = value
  }
}

class expression extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.type = type
    this.value = value
    this.data = data
  }
}

class lua extends type {
  constructor(type, value, data) {
    super(type, value, data)
    this.type = type
    this.value = value
    this.data = data
  }
}

class command extends type {

}

class operation extends type {

}

class JSExp extends type {

}
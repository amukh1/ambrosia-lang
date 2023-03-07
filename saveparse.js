export default function parse(tokens) {
  let i = 0
  let final = []
  // console.log(tokens)
  while(i<=tokens.length) {
    console.log(tokens)
    console.log(i)
    // console.log(tokens[i])
    // console.log(i,tokens.length)
    if(tokens[i].value == 'fun' && tokens[i].type !== 'STRING') {
      let params = []
      let j = i + 3
      let b = false
      while(b == false) {
      // console.log(tokens[j])
        if(tokens[j].type == 'C-PAREN'){
          b = true
          break
        }else {
          if(tokens[j].type !== 'COMMA') {
            params.push(tokens[j])
          }
        }
        j++
      }
      let body = []
      b = false
      j+=2
      while(b == false) {
        // console.log(tokens[j])
        if(tokens[j].type == "C-BRACE") break;
        body.push(tokens[j])
        j++
      }
      let f = new func('fun', tokens[i+1], {body: parse(body), params})
      // console.log(f)
      final.push(f)
      i=j
    }else if(tokens[i].type == 'WORD' && tokens[i + 1].type == 'O-PAREN'){
      let data = []
      let name = tokens[i]
      let j = i + 2
      while(true) {
        if(tokens[j].type == 'C-PAREN') break;
        data.push(tokens[j].value)
        j++
      }
      i = j+1
      
      let f = new funcCALL('funcCALL', name, data)
      // console.log(f)
      final.push(f)
    } 
    // else if(tokens[i].value == 'let' && tokens[i].type !== 'STRING') {
    //   let n = tokens[i+1]
    //   let v = []
    //   let j = i+3
    //   while(true) {
    //     if(tokens[j].type == 'SEMI') break
    //     v.push(tokens[j])
    //     j++
    //   }
    //   let varib = new dec('dec', n, parse(v))
    //   final.push(varib)
    //   i=j
    // }
    // else if(tokens[i].type == 'DECLARATION'){
    //   console.log('ttt',tokens)
    //   // console.log('t',tokens[i])
    //   let n = tokens[i-1]
    //   let v = []
    //   let j = i+2
    //   while(true) {
    //     if(tokens[j].type == 'SEMI') break
    //     v.push(tokens[j])
    //     j++
    //   }
    //   final.push(new redec('redec', n, parse(v)))
    //   i=j
    // }
    else console.log(tokens[i])
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
  
}

class command extends type {
  
}

class operation extends type {
  
}

class JSExp extends type {
  
}
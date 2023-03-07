import {derivative} from './functionBank.js'


// let { Algebra } = require('./math.js')
// let algebra = new Algebra({ 'a': 2 })
// algebra.fun('A(r) = pi*r^2')
// console.log(algebra)
// console.log('----------------')
// console.log(algebra.evaluate(algebra.parse('2*a'), {}))
// console.log('----------------')
// console.log(algebra.func('A', 4))


// console.log(math.parse('1+2-1+3'))

// console.log('---')

// console.log(math.evaluate(math.parse('pi^a+1+2'), {'a':4}))

// console.log(math.evaluate(math.parse('pi^a+1+2'), {'b':3}))

class equality {
  constructor(a, b) {
    this.type = "equality"
    this.a = a
    this.b = b
  }
}

class operation {
  constructor(op, a, b) {
    this.type = "operation"
    this.operation = op
    this.a = a
    this.b = b
  }
}

class literal {
  constructor(ltype, literal) {
  this.type = "literal"
  this.literal = literal
  this.ltype = ltype
  }
}

class Algebra {
  
constructor(v) {
  this.vars = {'e': Math.E, 'pi': Math.PI,...v}
  this.operations = {
  'addition': function(a,b) {
    return a + b
  },
  'subtraction': function(a,b) {
    return a - b
  },
  'multiplication': function(a,b) {
    return a*b
  },
  'division': function(a,b) {
    return a/b
  },
  'exponentiation': function(a,b) {
    return Math.pow(a,b)
  }
    };
  this.funcs = {}
};
  
parse(str) {
  str = str.split(" ").join("")
  let resp
  if (str.includes("=")) {
    return new equality(this.parse(str.split("=")[0]), this.parse(str.split("=")[1]))

  }else if(str.includes("+")) {
    // console.log(str.split("+").splice(1,str.split("+").length))
    return new operation('addition', this.parse(str.split("+")[0]), this.parse(str.split("+").splice(1,str.split("+").length).join("+")))
  }else if(str.includes("-")) {
    
    return new operation('subtraction', this.parse(str.split("-")[0]), this.parse(str.split("-").splice(1,str.split("-").length).join("-")))
  }else if(str.includes("*")) {
    return new operation('multiplication', this.parse(str.split("*")[0]), this.parse(str.split("*").splice(1,str.split("*").length).join("*")))
  }else if(str.includes("/")) {
    return new operation('division', this.parse(str.split("/")[0]), this.parse(str.split("/").splice(1,str.split("/").length).join("/")))
  }else if(str.includes("^")) {
    return new operation('exponentiation', this.parse(str.split("^")[0]), this.parse(str.split("^").splice(1,str.split("^").length).join("^")))
  }

  else if(!isNaN(parseInt(str))) {
    return new literal('numerical', parseInt(str))
  }else {
    return new literal('variable', str)
  }
};

evaluate(tree, v) {
    let vars = {...this.vars,...v}
  if(tree.type == 'literal') {
    if(tree.ltype == 'numerical') return tree
    tree = new literal('numerical', vars[tree.literal])
    return tree
  }else if(tree.type == 'operation') {
    if(tree.a.type == 'literal' & tree.b.type == 'literal') {
      tree = new literal('numerical', this.operations[tree.operation](this.evaluate(tree.a, v).literal, this.evaluate(tree.b, v).literal))
    }else {
       tree = new literal('numerical', this.operations[tree.operation](this.evaluate(tree.a, v).literal, this.evaluate(tree.b, v).literal))
    }
  }
  return tree
};

fun(str) {
  let n = str.split('=')[0].split('(')[0]
  let v = str.split('=')[0].split('(')[1].split(')')[0]
  let exp = str.split('=')[1]
  // n(v) = exp, f(x) = 2x
  let add = {}
  add[n] = [v,exp]
  this.funcs = {...this.funcs,...add}
}

func(f, v) {
  let add = {}
  add[this.funcs[f][0]] = v
  return this.evaluate(this.parse(this.funcs[f][1]), add)
}

vari(str) {
  let add = {}
  add[str.split('=')[0]] = str.split('=')[1]
  this.vars = {...this.vars,...add}
}

multiline(str) {
  let resp = []
  str.split(';').forEach((x,i)=>{
    resp.push(this.evaluate(this.parse(x)))
  })
  return resp
}
  
};

export {Algebra}
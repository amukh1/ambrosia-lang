class module {
    contructor() { }
  
    function(name, rtype, params, body) {
      let args = []
      params.forEach((x) => {
        args.push(`${x.rtype.value} %${x.value}`)
      })
      return `define ${rtype} @${name}(${args.join(',')}) {
        ${body}
      }`
    }
  
    funcCall(name, rtype, params) {
      let args = []
      params.forEach((x) => {
        args.push(`${x.rtype.value} %${x.value}`)
      })
      return `call ${rtype} @${name.value}(${args.join(',')})`
    }
  
    variable(name, type, value) {
      `@${name} = global ${type} ${value}`
    }
  
  }
  
  let lv = new module()
  
  // console.log(lv.function('main', 'i32', [{ value: 'x', type: 'i32' }], lv.funcCall('main', 'i32', [{ value: 'x', type: 'i32' }])))
  // console.log(lv.funcCall('main', 'i32', [{ value: 'x', type: 'i32' }]))
  
  export default module
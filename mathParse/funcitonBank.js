// finish defining functions

function derivative(f) { // FINISHED
  return (x) => {
    return (f(x+0.001) - f(x))/0.001
  }
}
function riemann() {}
function dot() {}
function cross() {}
function det() {}
function inverse() {}

export {derivative, riemann, dot, cross, det, inverse}
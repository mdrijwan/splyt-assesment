/*
Task:
Write a function defaultArguments . It takes a function as an argument, along with an
object containing default values for that function's arguments, and returns another function
which defaults to the right values.

Requirements:
* You cannot assume that the function's arguments have any particular names.
* You should be able to call defaultArguments repeatedly to change the defaults.
*/

// Solution
function defaultArguments(func, defaults) {
  const funcString = func.toString()
  const argNames = funcString
    .slice(funcString.indexOf('(') + 1, funcString.indexOf(')'))
    .match(/[\w]+/g)

  return function (...args) {
    const mergedArgs = [...args] // Copy the args array to avoid modifying the original

    // Fill in default values for missing arguments
    for (let i = 0; i < argNames.length; i++) {
      if (mergedArgs[i] === undefined || mergedArgs[i] === null) {
        if (Object.prototype.hasOwnProperty.call(defaults, argNames[i])) {
          mergedArgs[i] = defaults[argNames[i]]
        }
      }
    }

    // Call the original function with merged arguments
    return func.apply(this, mergedArgs)
  }
}

// Examples
function add(a, b) {
  return a + b
}

const add2 = defaultArguments(add, { b: 9 })
console.assert(add2(10) === 19)
console.assert(add2(10, 7) === 17)
console.assert(isNaN(add2()))

const add3 = defaultArguments(add2, { b: 3,
a: 2 })
console.assert(add3(10) === 13)
console.assert(add3() === 5)

const add4 = defaultArguments(add, { c: 3 })
console.assert(isNaN(add4(10)))
console.assert(add4(10, 10) === 20)

const add5 = defaultArguments(add2, { a: 10 })
console.assert(add5() === 19)

/*
Explanation:
  This defaultArguments function takes a target function and an object containing default values for its arguments.
  It returns a new function that, when called, fills in missing arguments with their corresponding default values before invoking the original function.
*/

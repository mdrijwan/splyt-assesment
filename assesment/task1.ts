/*
Task:
Implement an asynchronous function retryFailures which accepts two parameters:
1. An asynchronous target function to call
2. A number of retries it will make

Requirements:
Your function will have to keep calling target function until it resolves to a value or
number of retries reaches retries parameter. Upon reaching max number of
retries allowed, retryFunction should throw last error thrown by
target function .
*/

// Solution
async function retryFailures<T>(fn: () => Promise<T>, retries: number) {
  //  my code here
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const result = await fn()

      return result // If the function succeeds, return the result
    } catch (error) {
      if (attempt === retries) {
        throw error // If it's the last attempt, re-throw the error
      }
      // If not the last attempt, continue to retry
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Wait for a second before retrying
    }
  }
}

function createTargetFunction(succeedsOnAttempt: number) {
  let attempt = 0
  return async () => {
    if (++attempt === succeedsOnAttempt) {
      return attempt
    }
    throw Object.assign(new Error('failure'), { attempt })
  }
}

// Examples
// succeeds on attempt number 3
retryFailures(createTargetFunction(3), 5).then((attempt) => {
  console.assert(attempt === 3)
})

// fails on attempt number 2 and throws last error
retryFailures(createTargetFunction(3), 2).catch((e) => {
  console.assert(e.attempt === 2)
})

// succeeds
retryFailures(createTargetFunction(10), 10).then((attempt) => {
  console.assert(attempt === 10)
})

/* 
  Explanation
    In this code, the retryFailures function attempts to call the provided asynchronous target function fn.
    If the function succeeds, it returns the result.
    If the function throws an error, it waits for a second before making the next attempt, up to the specified number of retries.
    If the maximum number of retries is reached, the function re-throws the last error encountered.
*/

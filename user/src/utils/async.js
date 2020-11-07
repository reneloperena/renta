import * as R from 'ramda'

const { curry } = R

export const asyncIteratorMap = curry(function (fun, asyncIterable) {
  return {
    [Symbol.asyncIterator]: async function * () {
      for await (const x of asyncIterable) {
        yield fun(x)
      }
    }
  }
})

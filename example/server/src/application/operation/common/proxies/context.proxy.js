import { grab, validate } from '@knowark/validarkjs/lib/index.js'
import { Contextor } from '#application/domain/common/index.js'

export class ContextProxy {
  constructor(dependencies) {
    this.contextor = grab(dependencies, Contextor)
  }

  proxy(method) {
    return async (input) => {
      [input] = validate(inputSchema, [input])

      return this.contextor.initialize(
        async () =>  method(input))
    }
  }
}

const inputSchema = {
  "meta": Object,
  "data": [Object]
}

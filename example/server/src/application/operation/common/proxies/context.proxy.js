import { grab, validate } from '@knowark/validarkjs/lib/index.js'
import { Contextor } from '#application/domain/common/index.js'

export class ContextProxy {
  constructor(dependencies) {
    this.contextor = grab(dependencies, Contextor)
  }

  proxy(method) {
    return async (entry) => {
      const [input] = validate(inputSchema, [entry])
      try {
        return await this.contextor.initialize(
          async () =>  method(input))
      } catch (error) {
        console.error(error)
        throw error
      }
    }
  }
}

const inputSchema = {
  "meta": Object,
  "data": [Object]
}

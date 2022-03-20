import { operations } from './operations.js'

export class Resource {
  constructor ({ injector, definition }) {
    this.injector = injector
    this.definition = definition
    this.operation = operations[
      this.definition.operationId]
  }

  async head (request, response, next) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, fixedMeta)

    const result = await handler(entry)

    response.set({ count: result.data.count })
    response.send()
  }

  async get (request, response, next) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, fixedMeta)

    const result = await handler(entry)

    response.json({ id: request.params.id })
  }

  async patch (request, response, next) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, fixedMeta)

    const result = await handler(entry)

    response.json(result)
  }

  async delete (request, response, next) {
    console.info('DELETE', request)
  }

  #resolveHandler(action) {
    const handlerName = this.operation.actions[action].handler
    const fixedMeta = this.operation.actions[action].meta
    const [operatorName, method] = handlerName.split('.')
    const operator = this.injector.resolve(operatorName)
    const handler = operator[method].bind(operator)

    return [handler, fixedMeta]
  }
}

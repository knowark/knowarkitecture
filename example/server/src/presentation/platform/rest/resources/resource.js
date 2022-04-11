import { operations } from './operations.js'

export class Resource {
  constructor ({ injector, definition }) {
    this.injector = injector
    this.definition = definition
    this.operation = operations[
      this.definition.operationId]
  }

  async head (request, response) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, request.meta, fixedMeta)

    const result = await handler(entry)

    response.set({ count: result.data.count })
    response.end()
  }

  async get (request, response) {
    const entry = { meta: {}, data: [] }
    Object.assign(entry, request.body)

    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, request.meta, fixedMeta)
    const result = await handler(entry)

    response.json(result)
  }

  async patch (request, response) {
    const entry = { meta: {}, data: [] }
    Object.assign(entry, request.body)

    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, request.meta, fixedMeta)

    const result = await handler(entry)

    response.json(result)
  }

  async delete (request, response) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    Object.assign(entry.meta, request.meta, fixedMeta)
    entry.data.push({ id: request.params.id })

    const result = await handler(entry)

    response.end()
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

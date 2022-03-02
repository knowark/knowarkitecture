import { operations } from './operations.js'

export class Resource {
  constructor ({ injector, definition }) {
    this.injector = injector
    this.definition = definition
    this.operation = operations[
      this.definition.operationId]
  }

  async head (request, response, next) {
    console.info('HEAD', request)
  }

  async get (request, response, next) {
    const entry = request.body || { meta: {}, data: [] }
    const action = entry.meta.action || 'default'
    const [handler, fixedMeta] = this.#resolveHandler(action)
    response.json({ id: request.params.id })
  }

  async patch (request, response, next) {
    console.info('PATCH', request)
  }

  async delete (request, response, next) {
    console.info('DELETE', request)
  }

  #resolveHandler(action) {
    const handler = this.operation.actions[action].handler
    const fixedMeta = this.operation.actions[action].meta
    const [operator, method] = handler.split('.')
    const handler = null
    return [handler, fixedMeta]
  }
}

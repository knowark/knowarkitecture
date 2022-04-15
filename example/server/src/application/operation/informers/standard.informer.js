import { grab } from '@knowark/validarkjs/lib/index.js'
import { Portal } from '#application/domain/services/index.js'

export class StandardInformer {
  constructor(dependencies) {
    this.portal = grab(dependencies, Portal)
  }

  async search (input) {
    const { meta } = input
    const repository = this.portal.get(meta.model)
    const result = await repository.search(meta.domain || [])
    return { data: result } 
  }
}

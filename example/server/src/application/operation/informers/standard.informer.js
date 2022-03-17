export class StandardInformer {
  constructor({ portal }) {
    this.portal = portal
  }

  async search(entry) {
    const { meta } = entry
    const repository = this.portal.get(meta.model)
    const result = await repository.search(meta.domain || [])
    return { data: result } 
  }
}

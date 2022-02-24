export class StandardManager {
  constructor({ portal }) {
    this.portal = portal
  }

  async add(entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)
    await repository.add(data)
  }

  async delete(entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)
    await repository.remove(data)
  }

}

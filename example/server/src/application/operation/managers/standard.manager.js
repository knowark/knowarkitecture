export class StandardManager {
  constructor({ portal }) {
    this.portal = portal
  }

  async set(entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)

    let items = await repository.find(data, { init: true }) 
    items = await repository.add(items)

    return { data: items }
  }

  async delete(entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)
    await repository.remove(data)
  }
}

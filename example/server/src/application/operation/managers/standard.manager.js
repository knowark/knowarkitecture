export class StandardManager {
  constructor({ portal }) {
    this.portal = portal
  }

  async set (entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)

    let items = await repository.find(data, { init: true }) 
    items = await repository.add(items)

    return { data: items }
  }

  async remove (entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)

    let items = await repository.find(data, { init: true }) 
    items = await repository.remove(items)

    return { data: items }
  }
}

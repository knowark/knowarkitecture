export class StandardManager {
  constructor({ portal }) {
    this.portal = portal
  }

  async set (entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)

    let entities = await repository.find(data, { init: true }) 
    entities.forEach((entity, index) => entity.transition(data[index]))

    entities = await repository.add(entities)

    return { data: entities }
  }

  async remove (entry) {
    const { meta, data } = entry
    const repository = this.portal.get(meta.model)

    let items = await repository.find(data, { init: true }) 
    items = await repository.remove(items)

    return { data: items }
  }
}

import { grab } from '@knowark/validarkjs/lib/index.js'
import { 
  Repository, MemoryRepository
} from '@knowark/modelark/lib/repository/index.js'
import { Tenant } from './tenant.js'

export class TenantSupplier {
  constructor(dependencies = {}) {
    this.repository = grab(dependencies, Repository,
      new MemoryRepository({ model: Tenant }))
  }

  async ensure ({ tid, tenant, organization }) {
    const data = [{
      id: tid,
      name: organization,
      slug: tenant
    }]
    let [entity] = await this.repository.find(data)
    if (!entity) {
      [entity] = await this.repository.add(data)
    }

    return entity
  }
}

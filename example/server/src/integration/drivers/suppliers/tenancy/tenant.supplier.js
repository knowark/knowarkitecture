import { 
  MemoryRepository
} from '@knowark/modelark/lib/repository/index.js'
import { Tenant } from './tenant.js'

export class TenantSupplier {
  constructor({ repository = new MemoryRepository(
    { model: Tenant }) } = {}) {
    this.repository = repository
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

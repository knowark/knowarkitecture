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
    const entities = await this.repository.find(data, { init: true })
    const [entity] = await this.repository.add(entities)
    return entity
  }
}

import { uuid32encode } from '@knowark/modelark/lib/common/index.js'
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

  async ensure ({ tenantId, tenant, organization }) {
    const data = {
      id: tenantId,
      name: organization,
      slug: tenant,
      namespace: uuid32encode(tenantId) || tenantId
    }
    let [entity] = await this.repository.find([data])
    if (!entity) {
      [entity] = await this.repository.add(new Tenant(data))
    }

    console.log('Entity Tenant::', entity)

    return entity
  }
}

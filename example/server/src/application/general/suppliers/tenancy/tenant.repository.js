import { MemoryRepository } from '@knowark/modelark/lib/repository/index.js'
import { Tenant } from './tenant.js'

export class MemoryTenantRepository extends MemoryRepository {
    constructor(attributes = {}) {
        super({...attributes, model: Tenant })
    }
}

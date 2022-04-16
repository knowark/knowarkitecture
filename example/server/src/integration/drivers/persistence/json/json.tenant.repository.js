import { JsonRepository } from '@knowark/modelark/lib/repository/index.js'
import { SystemLocator } from '#application/domain/common/index.js'
import { Tenant } from '#application/general/suppliers/tenancy/index.js'

export class JsonTenantRepository extends JsonRepository {
    constructor(attributes = {}) {
        super({...attributes, model: Tenant, locator: new SystemLocator() })
    }
}

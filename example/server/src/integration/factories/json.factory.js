import { BaseFactory } from './base.factory.js'
import {
  JsonTenantRepository 
} from '#integration/drivers/persistence/index.js'

export class JsonFactory extends BaseFactory {                                                     
  tenantRepository () {
    const attributes = this.config.tenancy.json
    return new JsonTenantRepository(attributes)
  }
}

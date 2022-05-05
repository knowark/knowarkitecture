import { BaseFactory } from './base.factory.js'
import {
  JsonTenantRepository, JsonPortal
} from '#integration/drivers/persistence/index.js'

export class JsonFactory extends BaseFactory {                                                     
  tenantRepository () {
    const attributes = this.config.tenancy.json
    return new JsonTenantRepository(attributes)
  }

  portal (locator) {
    const directory = this.config.data.json.directory
    return new JsonPortal({ locator, directory })
  }
}

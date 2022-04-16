import { BaseFactory } from './base.factory.js'
import {
  JsonTenantRepository 
} from '#integration/drivers/persistence/index.js'

export class JsonFactory extends BaseFactory {                                                     
  tenantRepository () {
    return new JsonTenantRepository()
  }
}

import { validate, grab } from '@knowark/validarkjs/lib/index.js'
import { User } from '#application/domain/common/index.js'
import { Authorizer } from '#application/domain/common/index.js'
import { TenantSupplier } from '#application/general/suppliers/index.js'

export class ContextProxy {
  constructor(dependencies) {
    this.contextor = grab(dependencies, Contextor)
  }

  proxy(method) {
    return async (entry) => {
      const [authorization] = validate(
        authorizationSchema, [entry.meta?.authorization])

      const tenant = this.tenantSupplier.ensure(authorization)

      console.log('Tenant>>>', tenant)

      const user = new User(authorization)

      const context = {
        user: new User(authorization)
      }

      return this.authorizer.enter(user, async () =>  method(entry))
    }
  }
}

const authorizationSchema = {
  "*id": String,
  "*name": String,
  "*tenant": String,
  "*tenantId": String,
  "email": String,
  "organization": String,
  "zone": String,
  "active": Boolean,
}

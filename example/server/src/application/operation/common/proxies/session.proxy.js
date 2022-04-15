import { validate, grab } from '@knowark/validarkjs/lib/index.js'
import { User } from '#application/domain/common/index.js'
import { Authorizer } from '#application/domain/common/index.js'
import { TenantSupplier } from '#application/general/suppliers/index.js'

export class SessionProxy {
  constructor(dependencies) {
    this.authorizer = grab(dependencies, Authorizer)
    this.tenantSupplier = grab(dependencies, TenantSupplier)
  }

  proxy(method) {
    return async (input) => {
      const [authorization] = validate(
        authorizationSchema, [input.meta?.authorization])

      await this.tenantSupplier.ensure(authorization)

      this.authorizer.user = new User(authorization)

      return method(input)
    }
  }
}

const authorizationSchema = {
  "*id": String,
  "*name": String,
  "*tenant": String,
  "*tenantId": String,
  "*email": String,
  "*organization": String,
  "zone": String,
  "active": Boolean,
}

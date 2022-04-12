import { validate } from '@knowark/validarkjs/lib/index.js'
import { User } from '#application/domain/common/index.js'

export class SessionProxy {
  constructor({ authorizer }) {
    this.authorizer = authorizer
  }

  proxy(method) {
    return async (entry) => {
      const [authorization] = validate(
        authorizationSchema, [entry.meta?.authorization])

      const user = new User(authorization)

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

import jwt from 'jsonwebtoken'

export function accessMiddleware({ config }) {
  return (request, response, next) => {
    const authorization = request.get('Authorization')
    if (!authorization) return next()

    const token = authorization.replace('Bearer', '').trim()

    const secret = config.secret?.token

    let payload = null
    if (secret) {
      payload = jwt.verify(token, secret)
    } else {
      payload = jwt.decode(token)
    }

    request.meta = {
      authorization: {
        id: payload.uid,
        name: payload.name,
        email: payload.email,
        tenant: payload.tenant,
        tenantId: payload.tid,
        organization: payload.organization,
        zone: payload.zone,
        active: payload.active,
      }
    }

    return next()
  }
}

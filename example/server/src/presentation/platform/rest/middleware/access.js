import jwt from 'jsonwebtoken'

export function accessMiddleware({ config }) {
  return (request, _response, next) => {
    const authorization = request.get('Authorization')
    if (!authorization) return next()

    const payload = jwt.decode(authorization)

    request.meta = {
      authorization: payload 
    }

    return next()
  }
}

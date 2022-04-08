export function accessMiddleware(request, _response, next) {
  request.meta = {
    authorization: {
      uid: '001'
    }
  }
  next()
}

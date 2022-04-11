export function errorMiddleware({ config }) {
  return (error, request, response, next) => {
    console.error(error)
    response.status(500)
    response.json({
      errors: [{
        name: error.name,
        message: error.message,
        stack: error.stack
      }]
    })
  }
}

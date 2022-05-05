export const config = {
  port: Number(process.env.TUTORARK_PORT || 6291),
  factory: process.env.TUTORARK_FACTORY || 'check',
  tenancy: {
    json: {
      directory: process.env.TUTORARK_TENANCY_JSON_DIRECTORY || (
        process.env.HOME + '/data'),
      collection: process.env.TUTORARK_TENANCY_JSON_COLLECTION || 'tenants'
    },
    dsn: process.env.TUTORARK_TENANCY_DSN
  },
  secret: {
    token: process.env.TUTORARK_TOKEN_SECRET || ''
  },
  data: {
    json: {
      directory: process.env.TUTORARK_DATA_JSON_DIRECTORY || (
        process.env.HOME + '/data'),
    },
  }
}

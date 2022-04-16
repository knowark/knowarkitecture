export const config = {
  port: Number(process.env.TUTORARK_PORT || 6291),
  //auto: bool(os.environ.get('TUTORARK_AUTO') or True),
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
  //zones: {
  //"default": {
  //"dsn": os.environ.get('TUTORARK_ZONES_DEFAULT_DSN') or ('')
  //}
  //}
}

console.log('config', config)

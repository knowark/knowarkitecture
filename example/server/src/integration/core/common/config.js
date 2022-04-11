export const config = {
    port: Number(process.env.TUTORARK_PORT || 6291),
    //auto: bool(os.environ.get('TUTORARK_AUTO') or True),
    factory: process.env.TUTORARK_FACTORY || 'check',
    //tenancy: {
        //"dsn": os.environ.get('TUTORARK_TENANCY_DSN') or ('')
    //},
    secret: {
        'token': process.env.TUTORARK_TOKEN_SECRET || ''
    },
    //zones: {
        //"default": {
            //"dsn": os.environ.get('TUTORARK_ZONES_DEFAULT_DSN') or ('')
        //}
    //}
}

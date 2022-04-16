export class User {
    constructor(attributes = {}) {
        this.id = attributes.id || ''
        this.name = attributes.name || ''
        this.email = attributes.email || ''
        this.tenant = attributes.tenant || ''
        this.tenantId = attributes.tenantId || ''
        this.organization = attributes.organization || ''
        this.zone = attributes.zone || ''
        this.active = attributes.active || true
    }
}

export const ZERO_ID = '00000000-0000-0000-0000-000000000000'

export class SystemUser extends User {
constructor(attributes = {}) {
super(attributes)
this.id = ZERO_ID
this.name = 'system',
this.tenant = 'system'
this.tenantId = ZERO_ID 
this.organization = 'system'
}
}

export const ONE_ID = '11111111-1111-1111-1111-111111111111'

export class AnonymousUser extends User {
constructor(attributes = {}) {
super(attributes)
this.id = ONE_ID
this.name = 'anonymous',
this.tenant = 'anonymous'
this.tenantId = ONE_ID 
this.organization = 'anonymous'
}
}

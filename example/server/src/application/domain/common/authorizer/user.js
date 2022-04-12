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

import { Entity } from '@knowark/modelark/lib/common/entity.js'

export class Tenant extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.name = attributes.name || ''
        this.slug = attributes.slug || ''
        this.namespace = attributes.namespace || ''
    }
}

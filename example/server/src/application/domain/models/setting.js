import { Entity } from '@knowark/modelark/lib/common/entity.js'

export class Setting extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.userId = attributes.userId || ''
        this.type = attributes.type || ''
        this.name = attributes.name || ''
        this.value = attributes.value || ''
        this.description = attributes.description || ''
    }
}

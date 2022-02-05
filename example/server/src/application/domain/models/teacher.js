import { Entity } from 'modelark/lib/common/entity.js'

export class Teacher extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.name = attributes.name || ''
        this.identification = attributes.identification || ''
        this.email = attributes.email || ''
    }
}

import { Entity } from 'modelark/lib/common/entity.js'

export class Course extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.name = attributes.name || ''
        this.description = attributes.description || ''
    }
}
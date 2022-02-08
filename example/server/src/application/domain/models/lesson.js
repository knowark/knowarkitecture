import { Entity } from '@knowark/modelark/lib/common/entity.js'

export class Lesson extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.courseId = attributes.courseId || ''
        this.name = attributes.name || ''
    }
}

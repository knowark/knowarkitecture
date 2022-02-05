import { Entity } from 'modelark/lib/common/entity.js'

export class Enrolment extends Entity {
    constructor(attributes = {}) {
        super(attributes)
        this.courseId = attributes.courseId || ''
        this.studentId = attributes.studentId || ''
    }
}

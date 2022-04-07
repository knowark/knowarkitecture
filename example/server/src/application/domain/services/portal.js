import { 
  Portal, MemoryRepository
} from '@knowark/modelark/lib/repository/index.js'
import {
  Course, Enrolment, Lesson, Student, Teacher, Setting
} from '../models/index.js'

class MemoryPortal extends Portal {
  constructor({ locator } = {}) {
    const repositories = [
      new MemoryRepository({ model: Course, locator }),
      new MemoryRepository({ model: Enrolment, locator }),
      new MemoryRepository({ model: Lesson, locator }),
      new MemoryRepository({ model: Student, locator }),
      new MemoryRepository({ model: Teacher, locator }),
      new MemoryRepository({ model: Setting, locator }),
    ]
    super({ repositories })
  }

}

export { Portal, MemoryPortal }

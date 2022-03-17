import { 
  Portal, MemoryRepository
} from '@knowark/modelark/lib/repository/index.js'
import {
  Course, Enrolment, Lesson, Student, Teacher, Setting
} from '../models/index.js'

class MemoryPortal extends Portal {
  constructor() {
    const repositories = [
      new MemoryRepository({ model: Course }),
      new MemoryRepository({ model: Enrolment }),
      new MemoryRepository({ model: Lesson }),
      new MemoryRepository({ model: Student }),
      new MemoryRepository({ model: Teacher }),
      new MemoryRepository({ model: Setting }),
    ]
    super({ repositories })
  }

}

export { Portal, MemoryPortal }

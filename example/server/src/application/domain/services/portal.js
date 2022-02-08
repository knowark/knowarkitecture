import { Portal, MemoryRepository } from '@knowark/modelark/lib/repository'
import { Course, Enrolment, Lesson, Student, Teacher } from '../models'

class MemoryPortal extends Portal {
  constructor() {
    const repositories = [
      new MemoryRepository({ model: Course }),
      new MemoryRepository({ model: Enrolment }),
      new MemoryRepository({ model: Lesson }),
      new MemoryRepository({ model: Student }),
      new MemoryRepository({ model: Teacher }),
    ]
    super({ repositories })
  }

}

export { Portal, MemoryPortal }

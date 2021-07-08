from uuid import uuid4
from tutorark.application.domain.models.lesson import Lesson
from typing import List
from ...domain.services.repositories import LessonRepository
from ...domain.common import RecordList


class LessonManager:
    def __init__(self, lesson_repository: LessonRepository
                 ) -> None:
        self.lesson_repository = lesson_repository

    async def collect_lessons(self, entry: dict) -> dict:
        records = entry['data']
        lesson_ids = [
            lesson.setdefault('id', uuid4()) for lesson in records]

        existing_lessons = {item.id: vars(item) for item in
                              await self.lesson_repository.search(
                                   [('id','in', lesson_ids)])}

        updated_records = []
        for record in records:
            existing = existing_lessons.get(record['id'], {})
            existing.update(record)
            updated_records.append(existing)

        result = [vars(lesson) for lesson in
                  await self.lesson_repository.add([
                      Lesson(**updated_record)
                        for updated_record in updated_records])]

        return {'data':result}

    async def eliminate_lessons(self, entry: dict) -> dict:
        records = entry['data']
        existing_lessons = await self.lesson_repository.search(
            [('id', 'in', records)])

        result = await self.lesson_repository.remove(existing_lessons)
        return {'data': result}

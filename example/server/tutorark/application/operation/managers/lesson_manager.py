from tutorark.application.domain.models.lesson import Lesson
from typing import List
from ...domain.services.repositories import LessonRepository
from ...domain.common import RecordList


class LessonManager:
    def __init__(self, lesson_repository: LessonRepository
                 ) -> None:
        self.lesson_repository = lesson_repository

    async def collect_lessons(self, entry: dict) -> dict:
        lessons_ids = [
            items['id'] for items in
            entry.get('records') ]
        await self._delete_lessons(lessons_ids)
        result =  await self._create_lessons(entry.get('records'))
        return {'data': result}

    async def eliminate_lessons(self, entry: dict) -> bool:
        return await self._delete_lessons(entry.get('records'))


    async def _create_lessons(self, lessons_records: RecordList) -> RecordList:
        lessons = await self.lesson_repository.add([
            Lesson(**lessons_record)
            for lessons_record in lessons_records])
        return [vars(items) for items in lessons]


    async def _delete_lessons(self, lessons_ids: List[str]) -> bool:
        lessons = await self.lesson_repository.search(
            [('id', 'in', lessons_ids)])
        return await self.lesson_repository.remove(lessons)

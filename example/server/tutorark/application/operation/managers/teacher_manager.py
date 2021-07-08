from tutorark.application.domain.models.teacher import Teacher
from typing import List
from ...domain.services.repositories import TeacherRepository
from ...domain.common import RecordList


class TeacherManager:
    def __init__(self, teacher_repository: TeacherRepository
                 ) -> None:
        self.teacher_repository = teacher_repository

    async def collect_teachers(self, entry: dict) -> dict:
        teachers_ids = [
            items['id'] for items in
            entry.get('records') ]
        await self._delete_teachers(teachers_ids)
        result =  await self._create_teachers(entry.get('records'))
        return {'data': result}

    async def eliminate_teachers(self, entry: dict) -> bool:
        return await self._delete_teachers(entry.get('records'))


    async def _create_teachers(self, teachers_records: RecordList) -> RecordList:
        teachers = await self.teacher_repository.add([
            Teacher(**teachers_record)
            for teachers_record in teachers_records])
        return [vars(items) for items in teachers]


    async def _delete_teachers(self, teachers_ids: List[str]) -> bool:
        teachers = await self.teacher_repository.search(
            [('id', 'in', teachers_ids)])
        return await self.teacher_repository.remove(teachers)

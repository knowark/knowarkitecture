from uuid import uuid4
from tutorark.application.domain.models.teacher import Teacher
from typing import List
from ...domain.services.repositories import TeacherRepository
from ...domain.common import RecordList


class TeacherManager:
    def __init__(self, teacher_repository: TeacherRepository
                 ) -> None:
        self.teacher_repository = teacher_repository

    async def collect_teachers(self, entry: dict) -> dict:
        records = entry['data']
        teacher_ids = [
            teacher.setdefault('id', uuid4()) for teacher in records]

        existing_teachers = {item.id: vars(item) for item in
                              await self.teacher_repository.search(
                                   [('id','in', teacher_ids)])}

        updated_records = []
        for record in records:
            existing = existing_teachers.get(record['id'], {})
            existing.update(record)
            updated_records.append(existing)

        result = [vars(teacher) for teacher in
                  await self.teacher_repository.add([
                      Teacher(**updated_record)
                        for updated_record in updated_records])]

        return {'data':result}

    async def eliminate_teachers(self, entry: dict) -> dict:
        records = entry['data']
        existing_teachers = await self.teacher_repository.search(
            [('id', 'in', records)])

        result = await self.teacher_repository.remove(existing_teachers)
        return {'data': result}

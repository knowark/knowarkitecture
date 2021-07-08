from uuid import uuid4
from tutorark.application.domain.models.student import Student
from typing import List
from ...domain.services.repositories import StudentRepository
from ...domain.common import RecordList


class StudentManager:
    def __init__(self, student_repository: StudentRepository
                 ) -> None:
        self.student_repository = student_repository

    async def collect_students(self, entry: dict) -> dict:
        records = entry['data']
        student_ids = [
            student.setdefault('id', uuid4()) for student in records]

        existing_students = {item.id: vars(item) for item in
                              await self.student_repository.search(
                                   [('id','in', student_ids)])}

        updated_records = []
        for record in records:
            existing = existing_students.get(record['id'], {})
            existing.update(record)
            updated_records.append(existing)

        result = [vars(student) for student in
                  await self.student_repository.add([
                      Student(**updated_record)
                        for updated_record in updated_records])]

        return {'data':result}

    async def eliminate_students(self, entry: dict) -> dict:
        records = entry['data']
        existing_students = await self.student_repository.search(
            [('id', 'in', records)])

        result = await self.student_repository.remove(existing_students)
        return {'data': result}

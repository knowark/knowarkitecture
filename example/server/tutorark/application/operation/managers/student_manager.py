from tutorark.application.domain.models.student import Student
from typing import List
from ...domain.services.repositories import StudentRepository
from ...domain.common import RecordList


class StudentManager:
    def __init__(self, student_repository: StudentRepository
                 ) -> None:
        self.student_repository = student_repository

    async def collect_students(self, entry: dict) -> dict:
        students_ids = [
            items['id'] for items in
            entry.get('records') ]
        await self._delete_students(students_ids)
        result =  await self._create_students(entry.get('records'))
        return {'data': result}

    async def eliminate_students(self, entry: dict) -> bool:
        return await self._delete_students(entry.get('records'))


    async def _create_students(self, students_records: RecordList) -> RecordList:
        students = await self.student_repository.add([
            Student(**students_record)
            for students_record in students_records])
        return [vars(items) for items in students]


    async def _delete_students(self, students_ids: List[str]) -> bool:
        students = await self.student_repository.search(
            [('id', 'in', students_ids)])
        return await self.student_repository.remove(students)

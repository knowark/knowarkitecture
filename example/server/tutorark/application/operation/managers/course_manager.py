from tutorark.application.domain.models.course import Course
from typing import List, Dict
from ...domain.services.repositories import CourseRepository
from ...domain.common import RecordList


class CourseManager:
    def __init__(self, course_repository: CourseRepository
                 ) -> None:
        self.course_repository = course_repository

    async def collect_courses(self, entry: Dict) -> Dict:
        courses_ids = [
            items['id'] for items in
            entry.get('records') ]
        await self._delete_courses(courses_ids)
        result =  await self._create_courses(entry.get('records'))
        return {'data': result}

    async def eliminate_courses(self, entry: Dict) -> bool:
        return await self._delete_courses(entry.get('records'))


    async def _create_courses(self, courses_records: RecordList) -> RecordList:
        courses = await self.course_repository.add([
            Course(**courses_record)
            for courses_record in courses_records])
        return [vars(items) for items in courses]


    async def _delete_courses(self, courses_ids: List[str]) -> bool:
        courses = await self.course_repository.search(
            [('id', 'in', courses_ids)])
        return await self.course_repository.remove(courses)


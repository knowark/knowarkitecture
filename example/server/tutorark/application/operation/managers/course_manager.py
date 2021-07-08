from uuid import uuid4
from tutorark.application.domain.models.course import Course
from typing import List
from ...domain.services.repositories import CourseRepository
from ...domain.common import RecordList


class CourseManager:
    def __init__(self, course_repository: CourseRepository
                 ) -> None:
        self.course_repository = course_repository

    async def collect_courses(self, entry: dict) -> dict:
        records = entry['data']
        course_ids = [
            course.setdefault('id', uuid4()) for course in records]

        existing_courses = {item.id: vars(item) for item in
                              await self.course_repository.search(
                                   [('id','in', course_ids)])}

        updated_records = []
        for record in records:
            existing = existing_courses.get(record['id'], {})
            existing.update(record)
            updated_records.append(existing)

        result = [vars(course) for course in
                  await self.course_repository.add([
                      Course(**updated_record)
                        for updated_record in updated_records])]

        return {'data':result}

    async def eliminate_courses(self, entry: dict) -> dict:
        records = entry['data']
        existing_courses = await self.course_repository.search(
            [('id', 'in', records)])

        result = await self.course_repository.remove(existing_courses)
        return {'data': result}

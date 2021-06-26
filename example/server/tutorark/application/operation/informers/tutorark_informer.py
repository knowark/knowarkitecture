from typing import Dict
from abc import ABC, abstractmethod
from ...domain.services.repositories import (
    CourseRepository, EnrolmentRepository, LessonRepository, 
    StudentRepository, TeacherRepository)
from ...domain.common import RecordList, QueryDomain


class TutorarkInformer(ABC):
    @abstractmethod
    async def search(self,entry: Dict) -> Dict:
        """Returns a list of <<model>> dictionaries matching the domain"""

    @abstractmethod
    async def count(self, entry: Dict) -> Dict:
        """Returns a the <<model>> records count"""


class StandardTutorarkInformer(TutorarkInformer):
    def __init__(
            self, course_repository: CourseRepository,
            enrolment_repository: EnrolmentRepository,
            lesson_repository: LessonRepository,
            student_repository: StudentRepository,
            teacher_repository: TeacherRepository,

    ) -> None:
        self.course_repository = course_repository
        self.enrolment_repository = enrolment_repository
        self.lesson_repository = lesson_repository
        self.student_repository = student_repository
        self.teacher_repository = teacher_repository

    async def search(self,entry: Dict) -> Dict:
        model = entry.pop('model')
        repository = getattr(self, f'{model}_repository')
        result = await repository.search(**entry)
        return {'data': [vars(item) for item in result]}


    async def count(self, entry: Dict) -> Dict:
        model = entry['model']
        repository = getattr(self, f'{model}_repository')
        result = await repository.count(entry['domain'])
        return {'data':result}


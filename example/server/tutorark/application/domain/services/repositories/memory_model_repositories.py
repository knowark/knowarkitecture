from modelark import Repository, MemoryRepository
from ...models import (
    Course, Enrolment, Lesson, Student, Teacher)


class CourseRepository(Repository[Course]):
    model = Course


class MemoryCourseRepository(
        MemoryRepository, Course):
    """Memory Course Repository"""


class EnrolmentRepository(Repository[Enrolment]):
    model = Enrolment


class MemoryEnrolmentRepository(
        MemoryRepository, EnrolmentRepository):
    """Memory Enrolment Repository"""


class LessonRepository(Repository[Lesson]):
    model = Lesson


class MemoryLessonRepository(
        MemoryRepository, LessonRepository):
    """Memory Lesson Repository"""


class StudentRepository(Repository[Student]):
    model = Student


class MemoryStudentRepository(
        MemoryRepository, StudentRepository):
    """Memory Student Repository"""


class TeacherRepository(Repository[Teacher]):
    model = Teacher


class MemoryTeacherRepository(
        MemoryRepository, TeacherRepository):
    """Memory Teacher Repository"""

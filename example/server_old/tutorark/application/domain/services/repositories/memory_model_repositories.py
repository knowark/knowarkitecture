from modelark import (
    Repository, RepositoryResolver, MemoryRepository)
from ...models import (
    Course, Enrolment, Lesson, Student, Teacher)


class RepositoryService(RepositoryResolver):
    """Repository Resolver Service"""


class CourseRepository(Repository):
    model = Course


class MemoryCourseRepository(
        MemoryRepository, CourseRepository):
    """Memory Course Repository"""


class EnrolmentRepository(Repository):
    model = Enrolment


class MemoryEnrolmentRepository(
        MemoryRepository, EnrolmentRepository):
    """Memory Enrolment Repository"""


class LessonRepository(Repository):
    model = Lesson


class MemoryLessonRepository(
        MemoryRepository, LessonRepository):
    """Memory Lesson Repository"""


class StudentRepository(Repository):
    model = Student


class MemoryStudentRepository(
        MemoryRepository, StudentRepository):
    """Memory Student Repository"""


class TeacherRepository(Repository):
    model = Teacher


class MemoryTeacherRepository(
        MemoryRepository, TeacherRepository):
    """Memory Teacher Repository"""

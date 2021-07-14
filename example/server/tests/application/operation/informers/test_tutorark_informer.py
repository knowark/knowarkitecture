from typing import Dict
from pytest import fixture
from tutorark.application.domain.models import (
    Course, Enrolment, Lesson, Student, Teacher)
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant,
    AuthProvider, StandardAuthProvider, User, QueryDomain)
from tutorark.application.domain.services.repositories import (
    CourseRepository, MemoryCourseRepository,
    EnrolmentRepository, MemoryEnrolmentRepository,
    LessonRepository, MemoryLessonRepository,
    StudentRepository, MemoryStudentRepository,
    TeacherRepository, MemoryTeacherRepository)

from tutorark.application.operation.informers import (
    TutorarkInformer, StandardTutorarkInformer)


@fixture
def parser():
    return QueryParser()

# PROVIDERS


@fixture
def auth_provider() -> AuthProvider:
    auth_provider = StandardAuthProvider()
    auth_provider.setup(User(id='001', name='johndoe'))
    return auth_provider


@fixture
def tenant_provider():
    tenant_provider = StandardTenantProvider()
    tenant_provider.setup(Tenant(name="Default"))
    return tenant_provider

# REPOSITORIES


@fixture
def course_repository(
        tenant_provider, auth_provider, parser) -> CourseRepository:
    course_repository = MemoryCourseRepository(
        parser, tenant_provider, auth_provider)
    course_repository.load({
        'default': {
            '1': Course(**{'id': 'C001', 'name': "Developer"}),
            '2': Course(**{'id': 'C002', 'name': 'Data Base'}),
        }
    })
    return course_repository


@fixture
def student_repository(
        tenant_provider, auth_provider, parser) -> StudentRepository:
    student_repository = MemoryStudentRepository(
        parser, tenant_provider, auth_provider)
    student_repository.load({
        'default': {
            '1': Student(**{'id': 'S001', 'name': "John Doe",
            'identification':"123456789",'email':"jdoe@example.com"}),
            '2': Student(**{'id': 'S002', 'name': "Daniel Perez",
            'identification':"987654321",'email':"dperez@example.com"}),
        }
    })
    return student_repository


@fixture
def enrolment_repository(
        tenant_provider, auth_provider, parser) -> EnrolmentRepository:
    enrolment_repository = MemoryEnrolmentRepository(
        parser, tenant_provider, auth_provider)
    enrolment_repository.load({
        'default': {
            '1': Enrolment(**{'id': '1', 'course_id': "C001","student_id":"S001"}),
            '2': Enrolment(**{'id': '2', 'course_id': 'C002',"student_id":"S002"}),
        }
    })
    return enrolment_repository

@fixture
def lesson_repository(
        tenant_provider, auth_provider, parser) -> LessonRepository:
    lesson_repository = MemoryLessonRepository(
        parser, tenant_provider, auth_provider)
    lesson_repository.load({
        'default': {
            '1': Lesson(**{'id': 'L001', 'course_id': "C001","name":"Introduction"}),
            '2': Lesson(**{'id': 'L002', 'course_id': 'C002',"name":"Topics"}),
        }
    })
    return lesson_repository

@fixture
def teacher_repository(
        tenant_provider, auth_provider, parser) -> TeacherRepository:
    teacher_repository = MemoryTeacherRepository(
        parser, tenant_provider, auth_provider)
    teacher_repository.load({
        'default': {
            '1': Teacher(**{'id': 'T001', 'name': "Richard Roe","identification":"67890","email":"rroe@example.com"}),
            '2': Teacher(**{'id': 'T002', 'name': "Alex Joe","identification":"54685","email":"ajoe@example.com"}),
        }
    })
    return teacher_repository


# INFORMERS

@fixture
def tutorark_informer(course_repository: CourseRepository,
                        enrolment_repository: EnrolmentRepository,
                        lesson_repository: LessonRepository,
                        student_repository: StudentRepository,
                        teacher_repository: TeacherRepository
                        ) -> TutorarkInformer:
    return StandardTutorarkInformer(
        course_repository, enrolment_repository,
        lesson_repository, student_repository, teacher_repository)


# course


async def test_tutorark_informer_search_courses_all(
        tutorark_informer: TutorarkInformer) -> None:
    domain: QueryDomain = []
    courses = await tutorark_informer.search(
        dict(model='course',domain = domain))
    assert len(courses['data']) == 2


async def test_tutorark_informer_search_courses_security(
        tutorark_informer: TutorarkInformer) -> None:

    domain: QueryDomain = [('name', '=', 'Developer')]
    courses = await tutorark_informer.search(
        dict(model = 'course', domain = domain))
    assert len(courses['data']) == 1


async def test_tutorark_informer_courses_count(
        tutorark_informer: TutorarkInformer)->None:
    courses_count = await tutorark_informer.count(
        dict(model='course',domain=[]))
    assert courses_count['data'] == 2

# student


async def test_tutorark_informer_search_students_all(
        tutorark_informer: TutorarkInformer) -> None:
    domain: QueryDomain = []
    students = await tutorark_informer.search(
        dict(model='student',domain = domain))
    assert len(students['data']) == 2


async def test_tutorark_informer_search_students_security(
        tutorark_informer: TutorarkInformer) -> None:

    domain: QueryDomain = [('name', '=', 'John Doe')]
    students = await tutorark_informer.search(
        dict(model = 'student', domain = domain))
    assert len(students['data']) == 1


async def test_tutorark_informer_students_count(
        tutorark_informer: TutorarkInformer)->None:
    students_count = await tutorark_informer.count(
        dict(model='student',domain=[]))
    assert students_count['data'] == 2

# enrolment


async def test_tutorark_informer_search_enrolments_all(
        tutorark_informer: TutorarkInformer) -> None:
    domain: QueryDomain = []
    enrolments = await tutorark_informer.search(
        dict(model = 'enrolment', domain = domain))
    assert len(enrolments['data']) == 2


async def test_tutorark_informer_search_enrolments_security(
        tutorark_informer: TutorarkInformer) -> None:

    domain: QueryDomain = [('course_id', '=', 'C001')]
    enrolments = await tutorark_informer.search(
        dict(model = 'enrolment',domain = domain))
    assert len(enrolments['data']) == 1


async def test_tutorark_informer_count_enrolments(
        tutorark_informer: TutorarkInformer):
    enrolments_count = await tutorark_informer.count(
        dict(model='enrolment',domain=[])
    )
    assert enrolments_count['data'] == 2

# lesson


async def test_tutorark_informer_search_lessons_all(
        tutorark_informer: TutorarkInformer) -> None:
    domain: QueryDomain = []
    lessons = await tutorark_informer.search(
        dict(model='lesson',domain = domain))
    assert len(lessons['data']) == 2


async def test_tutorark_informer_search_lessons_security(
        tutorark_informer: TutorarkInformer) -> None:

    domain: QueryDomain = [('name', '=', 'Introduction')]
    lessons = await tutorark_informer.search(
        dict(model = 'lesson', domain = domain))
    assert len(lessons['data']) == 1


async def test_tutorark_informer_lessons_count(
        tutorark_informer: TutorarkInformer)->None:
    lessons_count = await tutorark_informer.count(
        dict(model='lesson',domain=[]))
    assert lessons_count['data'] == 2

# teacher


async def test_tutorark_informer_search_teachers_all(
        tutorark_informer: TutorarkInformer) -> None:
    domain: QueryDomain = []
    teachers = await tutorark_informer.search(
        dict(model='teacher',domain = domain))
    assert len(teachers['data']) == 2


async def test_tutorark_informer_search_teachers_security(
        tutorark_informer: TutorarkInformer) -> None:

    domain: QueryDomain = [('name', '=', 'Richard Roe')]
    teachers = await tutorark_informer.search(
        dict(model = 'teacher', domain = domain))
    assert len(teachers['data']) == 1


async def test_tutorark_informer_teachers_count(
        tutorark_informer: TutorarkInformer)->None:
    teachers_count = await tutorark_informer.count(
        dict(model='teacher',domain=[]))
    assert teachers_count['data'] == 2

from typing import Dict
from pytest import fixture
from tutorark.application.domain.models import (
    Course, Enrolment, Lesson, Student, Teacher)
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant,
    AuthProvider, StandardAuthProvider, User, QueryDomain)
from tutorark.application.domain.services.repositories import (
    RepositoryService,
    CourseRepository, MemoryCourseRepository,
    EnrolmentRepository, MemoryEnrolmentRepository,
    LessonRepository, MemoryLessonRepository,
    StudentRepository, MemoryStudentRepository,
    TeacherRepository, MemoryTeacherRepository)
from tutorark.application.operation.informers import StandardInformer


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
            'C001': Course(**{
                'id': 'C001', 
                'name': "Developer"
                }),
            'C002': Course(**{
                'id': 'C002', 
                'name': 'Data Base'
                }),
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
            'S001': Student(**{
                'id': 'S001', 
                'name': "John Doe",
                'identification':"123456789",
                'email':"jdoe@example.com"
                }),
            'S002': Student(**{
                'id': 'S002', 
                'name': "Daniel Perez",
                'identification':"987654321",
                'email':"dperez@example.com"
                }),
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
            'E001': Enrolment(**{
                'id': 'E001', 
                'course_id': "C001",
                "student_id":"S001"
                }),
            'E002': Enrolment(**{
                'id': 'E002', 
                'course_id': 'C002',
                "student_id":"S002"
                }),
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
            'L001': Lesson(**{
                'id': 'L001', 
                'course_id': "C001",
                "name":"Introduction"}),
            'L002': Lesson(**{
                'id': 'L002', 
                'course_id': 'C002',
                "name":"Topics"
                }),
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
            'T001': Teacher(**{
                'id': 'T001', 
                'name': "Richard Roe",
                "identification":"67890",
                "email":"rroe@example.com"
                }),
            'T002': Teacher(**{
                'id': 'T002', 
                'name': "Alex Joe",
                "identification":"54685",
                "email":"ajoe@example.com"
                }),
        }
    })
    return teacher_repository


@fixture
def repository_service(course_repository, student_repository, 
                       enrolment_repository, lesson_repository,
                       teacher_repository):
    return RepositoryService([course_repository, student_repository,
                              enrolment_repository, lesson_repository,
                              teacher_repository])

# INFORMERS

@fixture
def standard_informer(repository_service)-> StandardInformer:
    return StandardInformer(repository_service)


# course

async def test_standard_informer_search_courses_all(
        standard_informer: StandardInformer) -> None:
    domain: QueryDomain = []
    courses = await standard_informer.search(
        {'meta': dict(model='Course', domain=domain)})
    assert len(courses['data']) == 2


async def test_standard_informer_search_courses_security(
        standard_informer: StandardInformer) -> None:

    domain: QueryDomain = [('name', '=', 'Developer')]
    courses = await standard_informer.search(
        {'meta': dict(model='Course', domain=domain)})
    assert len(courses['data']) == 1


async def test_standard_informer_courses_count(
        standard_informer: StandardInformer)->None:
    courses_count = await standard_informer.count(
        {'meta': dict(model='Course', domain=[])})
    assert courses_count['data'] == 2

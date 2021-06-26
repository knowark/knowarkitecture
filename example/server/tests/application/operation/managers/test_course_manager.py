from pytest import fixture
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant, RecordList,
    StandardAuthProvider, User)
from tutorark.application.domain.services.repositories import (
    CourseRepository, MemoryCourseRepository)
from tutorark.application.operation.managers import CourseManager

# parser


@fixture
def parser() -> QueryParser:
    return QueryParser()


# providers
@fixture
def auth_provider() -> StandardAuthProvider:
    auth_provider = StandardAuthProvider()
    auth_provider.setup(User(id='001', name='johndoe'))
    return auth_provider


@fixture
def tenant_provider() -> StandardTenantProvider:
    tenant_provider = StandardTenantProvider()
    tenant_provider.setup(Tenant(name="Default"))
    return tenant_provider


# repositories
@fixture
def course_repository(tenant_provider, auth_provider):
    return MemoryCourseRepository(
        QueryParser(), tenant_provider, auth_provider)


# manager
@fixture
def course_manager(
        course_repository: CourseRepository,
) -> CourseManager:
    return CourseManager(course_repository)


def test_course_manager_instantiation(
        course_manager: CourseManager) -> None:
    assert hasattr(course_manager, 'collect_courses')


# course
async def test_course_manager_create_course(
        course_manager: CourseManager) -> None:
    course_data: RecordList = [{
        'id': 'C001',
        'name': 'Ancient Philosophy',
        'description': 'The study of Greek and Roman philosophers',
    }]

    await course_manager._create_courses(course_data)

    courses = getattr(
        course_manager.course_repository, 'data')['default']
    assert len(courses) == 1


async def test_course_manager_delete_course(
        course_manager: CourseManager) -> None:
    course_id = '003'
    course_records: RecordList = [{
        'id': course_id,
        'name': 'Developer',
        'description': 'Lorem Ipsum is simply dummy text of the printing',
    }]

    await course_manager._create_courses(course_records)

    courses_data = getattr(
        course_manager.course_repository, 'data')

    assert len(courses_data['default']) == 1

    await course_manager._delete_courses([course_id])

    assert len(courses_data['default']) == 0


async def test_course_manager_eliminate_course(
        course_manager: CourseManager) -> None:
    course_id = '003'
    course_records: RecordList = [{
        'id': course_id,
        'name': 'Developer',
        'description': 'Lorem Ipsum is simply dummy text of the printing',
    }]

    await course_manager._create_courses(course_records)

    courses_data = getattr(
        course_manager.course_repository, 'data')

    assert len(courses_data['default']) == 1

    await course_manager.eliminate_courses(dict(records=[course_id]))

    assert len(courses_data['default']) == 0


async def test_course_manager_collect_existing_courses(
        course_manager: CourseManager) -> None:
    course_id = '004'
    course_records: RecordList = [{
        'id': course_id,
        'name': 'Developer',
        'description': 'Lorem Ipsum is simply dummy text of the printing',
    }]
    await course_manager.collect_courses(dict(records=course_records))

    courses_data = getattr(
        course_manager.course_repository, 'data')

    assert len(courses_data['default']) == 1

    updated_courses_data: RecordList = [{
        'id': course_id,
        'name': 'Data Bases',
        'description': 'Lorem Ipsum is simply dummy text of the printing',
    }]

    await course_manager.collect_courses(dict(records=updated_courses_data))

    assert courses_data['default'][course_id].name == (
        'Data Bases')

    assert len(courses_data['default']) == 1

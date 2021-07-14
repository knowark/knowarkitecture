from pytest import fixture
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant, RecordList,
    StandardAuthProvider, User)
from tutorark.application.domain.services.repositories import (
    LessonRepository, MemoryLessonRepository)
from tutorark.application.operation.managers import LessonManager

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
def lesson_repository(tenant_provider, auth_provider):
    return MemoryLessonRepository(
        QueryParser(), tenant_provider, auth_provider)


# manager
@fixture
def lesson_manager(
        lesson_repository: LessonRepository,
) -> LessonManager:
    return LessonManager(lesson_repository)


def test_lesson_manager_instantiation(
        lesson_manager: LessonManager) -> None:
    assert hasattr(lesson_manager, 'collect_lessons')


# lesson
async def test_lesson_manager_create_lesson(
        lesson_manager: LessonManager) -> None:
    lesson_data: RecordList = [{
        'id': 'L001',
        'course_id': 'C001',
        'name': 'Understanding Socrates',
    }]

    await lesson_manager.collect_lessons(dict(data=lesson_data))

    lessons = getattr(
        lesson_manager.lesson_repository, 'data')['default']
    assert len(lessons) == 1

async def test_lesson_manager_eliminate_lesson(
        lesson_manager: LessonManager) -> None:
    lesson_id = 'L003'
    lesson_records: RecordList = [{
        'id': lesson_id,
        'course_id': 'C003',
        'name': 'Understanding Platon',
    }]

    await lesson_manager.collect_lessons(dict(data=lesson_records))

    lessons_data = getattr(
        lesson_manager.lesson_repository, 'data')

    assert len(lessons_data['default']) == 1

    await lesson_manager.eliminate_lessons(dict(data=[lesson_id]))

    assert len(lessons_data['default']) == 0


async def test_lesson_manager_collect_existing_lessons(
        lesson_manager: LessonManager) -> None:
    lesson_id = 'L004'
    lesson_records: RecordList = [{
        'id': lesson_id,
        'course_id': 'C004',
        'name': 'Understanding Aristoteles',
    }]
    await lesson_manager.collect_lessons(dict(data=lesson_records))

    lessons_data = getattr(
        lesson_manager.lesson_repository, 'data')

    assert len(lessons_data['default']) == 1

    updated_lessons_data: RecordList = [{
        'id': lesson_id,
        'course_id': 'C004',
        'name': 'Understanding Pitagoras',
    }]

    await lesson_manager.collect_lessons(dict(data=updated_lessons_data))

    assert lessons_data['default'][lesson_id].name == (
        'Understanding Pitagoras')

    assert len(lessons_data['default']) == 1

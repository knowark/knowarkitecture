from pytest import fixture
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant, RecordList,
    StandardAuthProvider, User)
from tutorark.application.domain.services.repositories import (
    TeacherRepository, MemoryTeacherRepository)
from tutorark.application.operation.managers import TeacherManager

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
def teacher_repository(tenant_provider, auth_provider):
    return MemoryTeacherRepository(
        QueryParser(), tenant_provider, auth_provider)


# manager
@fixture
def teacher_manager(
        teacher_repository: TeacherRepository,
) -> TeacherManager:
    return TeacherManager(teacher_repository)


def test_teacher_manager_instantiation(
        teacher_manager: TeacherManager) -> None:
    assert hasattr(teacher_manager, 'collect_teachers')


# teacher
async def test_teacher_manager_create_teacher(
        teacher_manager: TeacherManager) -> None:
    teacher_data: RecordList = [{
        'id': 'S001',
        'name': 'John Doe',
        'identification': '123456789',
        'email':'jdoe@example.com',
    }]

    await teacher_manager._create_teachers(teacher_data)

    teachers = getattr(
        teacher_manager.teacher_repository, 'data')['default']
    assert len(teachers) == 1


async def test_teacher_manager_delete_teacher(
        teacher_manager: TeacherManager) -> None:
    teacher_id = 'S003'
    teacher_records: RecordList = [{
        'id': teacher_id,
        'name': 'John Doe',
        'identification': '123456789',
        'email':'jdoe@example.com',
    }]

    await teacher_manager._create_teachers(teacher_records)

    teachers_data = getattr(
        teacher_manager.teacher_repository, 'data')

    assert len(teachers_data['default']) == 1

    await teacher_manager._delete_teachers([teacher_id])

    assert len(teachers_data['default']) == 0


async def test_teacher_manager_eliminate_teacher(
        teacher_manager: TeacherManager) -> None:
    teacher_id = 'S003'
    teacher_records: RecordList = [{
        'id': teacher_id,
        'name': 'John Doe',
        'identification': '123456789',
        'email':'jdoe@example.com',
    }]

    await teacher_manager._create_teachers(teacher_records)

    teachers_data = getattr(
        teacher_manager.teacher_repository, 'data')

    assert len(teachers_data['default']) == 1

    await teacher_manager.eliminate_teachers(dict(records=[teacher_id]))

    assert len(teachers_data['default']) == 0


async def test_teacher_manager_collect_existing_teachers(
        teacher_manager: TeacherManager) -> None:
    teacher_id = 'S004'
    teacher_records: RecordList = [{
        'id': teacher_id,
        'name': 'Ana Doe',
        'identification': '85642',
        'email':'adoe@example.com',
    }]
    await teacher_manager.collect_teachers(dict(records=teacher_records))

    teachers_data = getattr(
        teacher_manager.teacher_repository, 'data')

    assert len(teachers_data['default']) == 1

    updated_teachers_data: RecordList = [{
        'id': teacher_id,
        'name': 'Maria Doe',
        'identification': '85642',
        'email':'adoe@example.com',
    }]

    await teacher_manager.collect_teachers(dict(records=updated_teachers_data))

    assert teachers_data['default'][teacher_id].name == (
        'Maria Doe')

    assert len(teachers_data['default']) == 1

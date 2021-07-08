from pytest import fixture
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant, RecordList,
    StandardAuthProvider, User)
from tutorark.application.domain.services.repositories import (
    StudentRepository, MemoryStudentRepository)
from tutorark.application.operation.managers import StudentManager

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
def student_repository(tenant_provider, auth_provider):
    return MemoryStudentRepository(
        QueryParser(), tenant_provider, auth_provider)


# manager
@fixture
def student_manager(
        student_repository: StudentRepository,
) -> StudentManager:
    return StudentManager(student_repository)


def test_student_manager_instantiation(
        student_manager: StudentManager) -> None:
    assert hasattr(student_manager, 'collect_students')


# student
async def test_student_manager_create_student(
        student_manager: StudentManager) -> None:
    student_data: RecordList = [{
        'id': 'S001',
        'name': 'John Doe',
        'identification': '123456789',
        'email':'jdoe@example.com',
    }]

    await student_manager.collect_students(dict(data=student_data))

    students = getattr(
        student_manager.student_repository, 'data')['default']
    assert len(students) == 1

async def test_student_manager_eliminate_student(
        student_manager: StudentManager) -> None:
    student_id = 'S003'
    student_records: RecordList = [{
        'id': student_id,
        'name': 'John Doe',
        'identification': '123456789',
        'email':'jdoe@example.com',
    }]

    await student_manager.collect_students(dict(data=student_records))

    students_data = getattr(
        student_manager.student_repository, 'data')

    assert len(students_data['default']) == 1

    await student_manager.eliminate_students(dict(data=[student_id]))

    assert len(students_data['default']) == 0


async def test_student_manager_collect_existing_students(
        student_manager: StudentManager) -> None:
    student_id = 'S004'
    student_records: RecordList = [{
        'id': student_id,
        'name': 'Ana Doe',
        'identification': '85642',
        'email':'adoe@example.com',
    }]
    await student_manager.collect_students(dict(data=student_records))

    students_data = getattr(
        student_manager.student_repository, 'data')

    assert len(students_data['default']) == 1

    updated_students_data: RecordList = [{
        'id': student_id,
        'name': 'Maria Doe',
        'identification': '85642',
        'email':'adoe@example.com',
    }]

    await student_manager.collect_students(dict(data=updated_students_data))

    assert students_data['default'][student_id].name == (
        'Maria Doe')

    assert len(students_data['default']) == 1

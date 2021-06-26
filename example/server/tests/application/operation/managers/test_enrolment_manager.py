from pytest import fixture
from tutorark.application.domain.common import (
    QueryParser, StandardTenantProvider, Tenant, RecordList,
    StandardAuthProvider, User)
from tutorark.application.domain.services.repositories import (
    EnrolmentRepository, MemoryEnrolmentRepository)
from tutorark.application.operation.managers import EnrolmentManager

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
def enrolment_repository(tenant_provider, auth_provider):
    return MemoryEnrolmentRepository(
        QueryParser(), tenant_provider, auth_provider)


# manager
@fixture
def enrolment_manager(
        enrolment_repository: EnrolmentRepository,
) -> EnrolmentManager:
    return EnrolmentManager(enrolment_repository)


def test_enrolment_manager_instantiation(
        enrolment_manager: EnrolmentManager) -> None:
    assert hasattr(enrolment_manager, 'collect_enrolments')


# enrolment
async def test_enrolment_manager_create_enrolment(
        enrolment_manager: EnrolmentManager) -> None:
    enrolment_data: RecordList = [{
        'id': 'E001',
        'course_id': 'C001',
        'student_id': 'S001',
    }]

    await enrolment_manager._create_enrolments(enrolment_data)

    enrolments = getattr(
        enrolment_manager.enrolment_repository, 'data')['default']
    assert len(enrolments) == 1


async def test_enrolment_manager_delete_enrolment(
        enrolment_manager: EnrolmentManager) -> None:
    enrolment_id = 'E003'
    enrolment_records: RecordList = [{
        'id': enrolment_id,
        'course_id': 'C001',
        'student_id': 'S001',
    }]

    await enrolment_manager._create_enrolments(enrolment_records)

    enrolments_data = getattr(
        enrolment_manager.enrolment_repository, 'data')

    assert len(enrolments_data['default']) == 1

    await enrolment_manager._delete_enrolments([enrolment_id])

    assert len(enrolments_data['default']) == 0


async def test_enrolment_manager_eliminate_enrolment(
        enrolment_manager: EnrolmentManager) -> None:
    enrolment_id = 'E003'
    enrolment_records: RecordList = [{
        'id': enrolment_id,
        'course_id': 'C001',
        'student_id': 'S001',
    }]

    await enrolment_manager._create_enrolments(enrolment_records)

    enrolments_data = getattr(
        enrolment_manager.enrolment_repository, 'data')

    assert len(enrolments_data['default']) == 1

    await enrolment_manager.eliminate_enrolments(dict(records=[enrolment_id]))

    assert len(enrolments_data['default']) == 0


async def test_enrolment_manager_collect_existing_enrolments(
        enrolment_manager: EnrolmentManager) -> None:
    enrolment_id = '004'
    enrolment_records: RecordList = [{
        'id': enrolment_id,
        'course_id': 'C001',
        'student_id': 'S001',
    }]
    await enrolment_manager.collect_enrolments(dict(records=enrolment_records))

    enrolments_data = getattr(
        enrolment_manager.enrolment_repository, 'data')

    assert len(enrolments_data['default']) == 1

    updated_enrolments_data: RecordList = [{
        'id': enrolment_id,
        'course_id': 'C001',
        'student_id': 'S002',
    }]

    await enrolment_manager.collect_enrolments(dict(records=updated_enrolments_data))

    assert enrolments_data['default'][enrolment_id].course_id == (
        'C001')

    assert len(enrolments_data['default']) == 1

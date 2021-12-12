from injectark import Factory
from ...application.domain.services.repositories import (
    RepositoryService, CourseRepository, MemoryCourseRepository,
    EnrolmentRepository, MemoryEnrolmentRepository,
    LessonRepository, MemoryLessonRepository,
    StudentRepository, MemoryStudentRepository,
    TeacherRepository, MemoryTeacherRepository)
from ...application.general.connector import (
    Connector, MemoryConnector, Transactor, MemoryTransactor)
from ...application.domain.common import (
    QueryParser, TenantProvider, StandardTenantProvider,
    AuthProvider, StandardAuthProvider)
from ...application.general.suppliers import (
    TenantSupplier, MemoryTenantSupplier,
    MigrationSupplier, MemoryMigrationSupplier)
from ...application.operation.managers import (
    CourseManager, EnrolmentManager, LessonManager,
    StudentManager, TeacherManager,
    SessionManager)
from ...application.operation.informers import StandardInformer
from ..core import Config


class BaseFactory(Factory):
    def __init__(self, config: Config) -> None:
        self.config = config
        self.public = [
            'StandardInformer', 'CourseManager', 'EnrolmentManager',
            'LessonManager', 'StudentManager', 'TeacherManager',
            'SessionManager'
        ]

    # Query parser

    def query_parser(self) -> QueryParser:
        return QueryParser()

    # Providers

    def auth_provider(self) -> StandardAuthProvider:
        return StandardAuthProvider()

    def tenant_provider(self) -> StandardTenantProvider:
        return StandardTenantProvider()


    # Suppliers

    def tenant_supplier(self) -> MemoryTenantSupplier:
        return MemoryTenantSupplier()

    def migration_supplier(self) -> MemoryMigrationSupplier:
        return MemoryMigrationSupplier()

    # General
    def connector(self) -> Connector:
        return MemoryConnector()

    def transactor(self) -> Transactor:
        return MemoryTransactor()

    # Repositories

    def course_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> CourseRepository:
        return MemoryCourseRepository(
            locator=tenant_provider, editor=auth_provider)

    def enrolment_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> EnrolmentRepository:
        return MemoryEnrolmentRepository(
            locator=tenant_provider, editor=auth_provider)

    def lesson_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> LessonRepository:
        return MemoryLessonRepository(
            locator=tenant_provider, editor=auth_provider)

    def student_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> StudentRepository:
        return MemoryStudentRepository(
            locator=tenant_provider, editor=auth_provider)

    def teacher_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> TeacherRepository:
        return MemoryTeacherRepository(
            locator=tenant_provider, editor=auth_provider)

    # Informers
    def standard_informer(
        self, transactor: Transactor, repository_service: RepositoryService
    ) -> StandardInformer:
        return transactor(StandardInformer)(repository_service)


    # Managers

    def course_manager(
            self, course_repository: CourseRepository,
            transactor: Transactor,
    ) -> CourseManager:
        return transactor(CourseManager)(
            course_repository)

    def enrolment_manager(
            self, enrolment_repository: EnrolmentRepository,
            transactor: Transactor,
    ) -> EnrolmentManager:
        return transactor(EnrolmentManager)(
            enrolment_repository)

    def lesson_manager(
            self, lesson_repository: LessonRepository,
            transactor: Transactor,
    ) -> LessonManager:
        return transactor(LessonManager)(
            lesson_repository)

    def student_manager(
            self, student_repository: StudentRepository,
            transactor: Transactor,
    ) -> StudentManager:
        return transactor(StudentManager)(
            student_repository)

    def teacher_manager(
            self, teacher_repository: TeacherRepository,
            transactor: Transactor,
    ) -> TeacherManager:
        return transactor(TeacherManager)(
            teacher_repository)

    def session_manager(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider,
            tenant_supplier: TenantSupplier
    ) -> SessionManager:
        return SessionManager(
            tenant_provider, auth_provider, tenant_supplier)

    def repository_service(
        self, course_repository: CourseRepository,
        enrolment_repository: EnrolmentRepository,
        lesson_repository: LessonRepository,
        student_repository: StudentRepository,
        teacher_repository: TeacherRepository,) -> RepositoryService:

        repositories = locals()
        repositories.pop('self')
        return RepositoryService(repositories.values())

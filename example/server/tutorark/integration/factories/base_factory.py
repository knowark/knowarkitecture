from injectark import Factory
from ...application.domain.services.repositories import (
    CourseRepository, MemoryCourseRepository,
    EnrolmentRepository, MemoryEnrolmentRepository,
    LessonRepository, MemoryLessonRepository,
    StudentRepository, MemoryStudentRepository,
    TeacherRepository, MemoryTeacherRepository)
from ...application.domain.common import (
    QueryParser, TenantProvider, StandardTenantProvider,
    AuthProvider, StandardAuthProvider,
    TransactionManager, MemoryTransactionManager)
from ...application.operation.managers import (
    CourseManager, EnrolmentManager, LessonManager,
    StudentManager, TeacherManager,
    SessionManager)
from ...application.operation.informers import (
    StandardTutorarkInformer)
from ..core import (
    Config, MemoryTenantSupplier, MemoryMigrationSupplier)


class BaseFactory(Factory):
    def __init__(self, config: Config) -> None:
        self.config = config

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

    # Repositories

    def course_repository(
            self, query_parser: QueryParser,
            tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryCourseRepository:
        return MemoryCourseRepository(
            query_parser, tenant_provider, auth_provider)

    def enrolment_repository(
            self, query_parser: QueryParser,
            tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryEnrolmentRepository:
        return MemoryEnrolmentRepository(
            query_parser, tenant_provider, auth_provider)

    def lesson_repository(
            self, query_parser: QueryParser,
            tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryLessonRepository:
        return MemoryLessonRepository(
            query_parser, tenant_provider, auth_provider)

    def student_repository(
            self, query_parser: QueryParser,
            tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryStudentRepository:
        return MemoryStudentRepository(
            query_parser, tenant_provider, auth_provider)

    def teacher_repository(
            self, query_parser: QueryParser,
            tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryTeacherRepository:
        return MemoryTeacherRepository(
            query_parser, tenant_provider, auth_provider)

    # Informers

    def tutorark_informer(
            self, course_repository: CourseRepository,
            enrolment_repository: EnrolmentRepository,
            lesson_repository: LessonRepository,
            student_repository: StudentRepository,
            teacher_repository: TeacherRepository,
            transaction_manager: TransactionManager
    ) -> StandardTutorarkInformer:
        return transaction_manager(StandardTutorarkInformer)(
            course_repository, enrolment_repository,
            lesson_repository, student_repository, teacher_repository)


    # Managers

    def course_manager(
            self, course_repository: CourseRepository,
            transaction_manager: TransactionManager
    ) -> CourseManager:
        return transaction_manager(CourseManager)(
            course_repository)

    def enrolment_manager(
            self, enrolment_repository: EnrolmentRepository,
            transaction_manager: TransactionManager
    ) -> EnrolmentManager:
        return transaction_manager(EnrolmentManager)(
            enrolment_repository)

    def lesson_manager(
            self, lesson_repository: LessonRepository,
            transaction_manager: TransactionManager
    ) -> LessonManager:
        return transaction_manager(LessonManager)(
            lesson_repository)

    def student_manager(
            self, student_repository: StudentRepository,
            transaction_manager: TransactionManager
    ) -> StudentManager:
        return transaction_manager(StudentManager)(
            student_repository)

    def teacher_manager(
            self, teacher_repository: TeacherRepository,
            transaction_manager: TransactionManager
    ) -> TeacherManager:
        return transaction_manager(TeacherManager)(
            teacher_repository)


    def session_manager(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider,
            transaction_manager: TransactionManager
    ) -> SessionManager:
        return transaction_manager(SessionManager)(
            tenant_provider, auth_provider)

    def transaction_manager(self) -> MemoryTransactionManager:
        return MemoryTransactionManager()

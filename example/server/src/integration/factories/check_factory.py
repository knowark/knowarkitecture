from ...application.domain.common import (
    User, Tenant, QueryParser,
    TenantProvider, StandardTenantProvider,
    AuthProvider, StandardAuthProvider)
from ...application.domain.models import (
    Course, Enrolment, Lesson, Student, Teacher)
from ...application.domain.services.repositories import (
    MemoryCourseRepository, MemoryEnrolmentRepository,
    MemoryLessonRepository, MemoryStudentRepository, MemoryTeacherRepository)
from ...application.general.suppliers import (
    TenantSupplier, MemoryTenantSupplier)
from ..core import Config
from .base_factory import BaseFactory


class CheckFactory(BaseFactory):
    def __init__(self, config: Config) -> None:
        super().__init__(config)
        self.config = config

    # Provider

    def tenant_provider(self) -> StandardTenantProvider:
        tenant_provider = StandardTenantProvider()
        tenant_provider.setup(Tenant(id='001', name="Default"))
        return tenant_provider

    def auth_provider(self) -> StandardAuthProvider:
        auth_provider = StandardAuthProvider()
        auth_provider.setup(User(id='001', name='johndoe'))
        return auth_provider

    # supplier

    def tenant_supplier(self) -> MemoryTenantSupplier:
        tenant_supplier = MemoryTenantSupplier()
        tenant_supplier.ensure_tenant({
            'id': '001',
            'name': 'Default'
        })
        return tenant_supplier

    # Repositories

    def course_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryCourseRepository:
        course_repository = MemoryCourseRepository(
            locator=tenant_provider, editor=auth_provider)
        course_repository.load({
            "default": {
                '1': Course(
                    **{
                        "id": "1",
                        "name": "Developer",
                        "description": "Lorem Ipsum is simply dummy text of the ",
                    }),
                '2': Course(
                    **{
                        "id": "2",
                        "name": "Data Bases",
                        "description": "Lorem Ipsum is simply dummy text of the ",
                    }),
            }
        })
        return course_repository

    def enrolment_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryEnrolmentRepository:
        enrolment_repository = MemoryEnrolmentRepository(
            locator=tenant_provider, editor=auth_provider)
        enrolment_repository.load({
            "default": {
                '1': Enrolment(
                    **{
                        "id": "1",
                        "course_id": "1",
                        "student_id": "1",
                    }),
                '2': Enrolment(
                    **{
                        "id": "2",
                        "course_id": "2",
                        "student_id": "2",
                    }),
            }
        })
        return enrolment_repository

    def lesson_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryLessonRepository:
        lesson_repository = MemoryLessonRepository(
            locator=tenant_provider, editor=auth_provider)
        lesson_repository.load({
            "default": {
                '1': Lesson(
                    **{
                        "id": "1",
                        "course_id": "1",
                        "name": "Understanding Pitagoras",
                    }),
                '2': Lesson(
                    **{
                        "id": "2",
                        "course_id": "2",
                        "name": "Understanding Aristoteles",
                    }),
            }
        })
        return lesson_repository

    def student_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryStudentRepository:
        student_repository = MemoryStudentRepository(
            locator=tenant_provider, editor=auth_provider)
        student_repository.load({
            "default": {
                '1': Student(
                    **{
                        "id": "1",
                        "name": "Jose Martinez",
                        "identification": "123456789",
                        "email":"jose@example.com",
                    }),
                '2': Student(
                    **{
                        "id": "2",
                        "name": "Danna Garcia",
                        "identification": "987456321",
                        "email":"danna@example.com",
                    }),
            }
        })
        return student_repository

    def teacher_repository(
            self, tenant_provider: TenantProvider,
            auth_provider: AuthProvider
    ) -> MemoryTeacherRepository:
        teacher_repository = MemoryTeacherRepository(
            locator=tenant_provider, editor=auth_provider)
        teacher_repository.load({
            "default": {
                '1': Teacher(
                    **{
                        "id": "1",
                        "name": "Duban Feliz",
                        "identification": "5469871",
                        "email":"duban@example.com",
                    }),
                '2': Teacher(
                    **{
                        "id": "2",
                        "name": "Martina Gonzales",
                        "identification": "8971266",
                        "email":"martina@example.com",
                    }),
            }
        })
        return teacher_repository

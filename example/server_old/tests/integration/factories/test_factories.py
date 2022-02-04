import inspect
from injectark import Injectark
from tutorark.integration.core.common import config
from tutorark.integration.factories import factory_builder


test_tuples = [
    ('BaseFactory', [
        #query parser
        ('QueryParser', 'QueryParser'),
        #providers
        ('AuthProvider', 'StandardAuthProvider'),
        ('TenantProvider', 'StandardTenantProvider'),
        #general
        ('Connector', 'MemoryConnector'),
        ('Transactor', 'MemoryTransactor'),
        #suppliers
        ('TenantSupplier', 'MemoryTenantSupplier'),
        ('MigrationSupplier', 'MemoryMigrationSupplier'),
        #repositories
        ('CourseRepository', 'MemoryCourseRepository'),
        ('EnrolmentRepository', 'MemoryEnrolmentRepository'),
        ('LessonRepository', 'MemoryLessonRepository'),
        ('StudentRepository', 'MemoryStudentRepository'),
        ('TeacherRepository', 'MemoryTeacherRepository'),
        #informers
        ('StandardInformer', 'StandardInformer'),
        #managers
        ('SessionManager', 'SessionManager'),
        ('StandardManager', 'StandardManager'),
    ]),
    ('CheckFactory', [
        #providers
        ('TenantProvider', 'StandardTenantProvider'),
        ('AuthProvider', 'StandardAuthProvider'),
        #suppliers
        ('TenantSupplier', 'MemoryTenantSupplier'),
        #repositories
        ('CourseRepository', 'MemoryCourseRepository'),
        ('EnrolmentRepository', 'MemoryEnrolmentRepository'),
        ('LessonRepository', 'MemoryLessonRepository'),
        ('StudentRepository', 'MemoryStudentRepository'),
        ('TeacherRepository', 'MemoryTeacherRepository'),
    ]),
    ('SqlFactory', [
    ]),
]


def test_factories():
    for factory_name, dependencies in test_tuples:
        factory = factory_builder.build(config, name=factory_name)

        injector = Injectark(factory=factory)

        for abstract, concrete in dependencies:
            result = injector.resolve(abstract)
            assert type(result).__name__ == concrete


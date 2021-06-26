from functools import partial
from injectark import Injectark
from ..helpers import StudentSchema
from .resource import Resource


class StudentResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['TutorarkInformer']
        manager = injector['StudentManager']

        super().__init__(
            StudentSchema,
            informer.count,
            informer.search,
            manager.collect_students,
            manager.eliminate_students)
        self.model = 'student'

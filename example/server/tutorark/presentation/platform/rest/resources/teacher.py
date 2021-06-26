from functools import partial
from injectark import Injectark
from ..helpers import TeacherSchema
from .resource import Resource


class TeacherResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['TutorarkInformer']
        manager = injector['TeacherManager']

        super().__init__(
            TeacherSchema,
            informer.count,
            informer.search,
            manager.collect_teachers,
            manager.eliminate_teachers)
        self.model = 'teacher'
from functools import partial
from injectark import Injectark
from .resource import Resource


class TeacherResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['StandardInformer']
        manager = injector['TeacherManager']

        super().__init__(
            informer.count,
            informer.search,
            manager.collect_teachers,
            manager.eliminate_teachers)
        self.model = 'teacher'

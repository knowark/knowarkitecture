from functools import partial
from injectark import Injectark
from .resource import Resource


class CourseResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['TutorarkInformer']
        manager = injector['CourseManager']

        super().__init__(
            informer.count,
            informer.search,
            manager.collect_courses,
            manager.eliminate_courses)
        self.model='course'



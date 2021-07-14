from functools import partial
from injectark import Injectark
from .resource import Resource


class LessonResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['TutorarkInformer']
        manager = injector['LessonManager']

        super().__init__(
            informer.count,
            informer.search,
            manager.collect_lessons,
            manager.eliminate_lessons)
        self.model = 'lesson'

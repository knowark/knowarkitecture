from functools import partial
from injectark import Injectark
from .resource import Resource


class EnrolmentResource(Resource):
    def __init__(self, injector: Injectark) -> None:
        informer = injector['StandardInformer']
        manager = injector['EnrolmentManager']

        super().__init__(
            informer.count,
            informer.search,
            manager.collect_enrolments,
            manager.eliminate_enrolments)
        self.model = 'enrolment'

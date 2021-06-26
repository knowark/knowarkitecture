from pytest import fixture
from injectark import Injectark
from tutorark.integration.core import config
from tutorark.presentation.system import Shell
from tutorark.integration.factories import factory_builder


@fixture
def shell() -> Shell:
    config['factory'] = 'BaseFactory'

    factory = factory_builder.build(config)

    injector = Injectark(factory)

    return Shell(config, injector)

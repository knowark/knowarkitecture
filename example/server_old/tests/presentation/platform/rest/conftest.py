from pytest import fixture
from injectark import Injectark
from tutorark.integration.factories import factory_builder
from tutorark.presentation.platform.rest import RestApplication
from tutorark.integration.core import config


@fixture
def app(loop, aiohttp_client):
    """Create app testing client"""
    config['factory'] = 'CheckFactory'

    factory = factory_builder.build(config)

    injector = Injectark(factory)

    app = RestApplication(injector)

    return loop.run_until_complete(aiohttp_client(app))


@fixture
def headers() -> dict:
    return {
        "Authorization":  (
            # secret: dev
            # Payload:
            # {
            #     "tid": "001",
            #     "uid": "001",
            #     "tenant": "Default",
            #     "name": "johndoe",
            #     "email": "john@doe.com"
            # }
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9."
            "eyJ0aWQiOiIwMDEiLCJ1aWQiOiIwMDEiLCJ0ZW"
            "5hbnQiOiJEZWZhdWx0IiwibmFtZSI6ImpvaG5kb"
            "2UiLCJlbWFpbCI6ImpvaG5AZG9lLmNvbSJ9.ytpW"
            "Kst-PB6ebHVAVrqp6-gO4AE3HKppv2tOzsNMtng"
        )

    }

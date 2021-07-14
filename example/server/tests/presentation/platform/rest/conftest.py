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

    app = RestApplication(config, injector)

    return loop.run_until_complete(aiohttp_client(app))


@fixture
def headers() -> dict:
    return {
        "Tenant": "Default",
        "From": "john@doe.com",
        "TenantId": "001",
        "UserId": "001",
        "Roles": "user"
    }

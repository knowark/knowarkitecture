from pytest import fixture
from tutorark.application.domain.common import (
    TenantProvider, StandardTenantProvider)


@fixture
def tenant_provider() -> TenantProvider:
    return StandardTenantProvider()

from pytest import fixture, raises
from tutorark.application.domain.common import (
    Tenant, TenantProvider, StandardTenantProvider)


@fixture
def tenant_provider() -> TenantProvider:
    return StandardTenantProvider()


def test_tenant_provider_methods():
    abstract_methods = TenantProvider.__abstractmethods__  # type: ignore
    assert 'setup' in abstract_methods


def test_standard_tenant_provider_instantiation(tenant_provider):
    assert isinstance(tenant_provider, TenantProvider)


def test_standard_tenant_provider_setup(tenant_provider):
    tenant = Tenant(name='Alpina')
    tenant_provider.setup(None)
    tenant_provider.setup(tenant)
    assert tenant_provider.tenant == tenant
    assert tenant_provider.location == 'alpina'
    assert tenant_provider.zone == ''


def test_standard_tenant_provider_get_tenant_not_set(tenant_provider):
    tenant_provider.setup(None)
    with raises(ValueError):
        assert tenant_provider.tenant


@fixture
def tenant() -> Tenant:
    return Tenant(name="Amazon")


def test_tenant_creation(tenant) -> None:
    assert isinstance(tenant, Tenant)


def test_tenant_default_attributes(tenant) -> None:
    assert tenant.id == ""
    assert tenant.name == "Amazon"
    assert tenant.slug == 'amazon'
    assert tenant.zone == ''


def test_tenant_attributes_from_dict() -> None:
    tenant_dict = {
        "id": "farbo007",
        "name": "Hortofrutícola El Cariño"
    }

    tenant = Tenant(**tenant_dict)

    for key, value in tenant_dict.items():
        assert getattr(tenant, key) == value


def test_tenant_normalize_slug() -> None:
    given_slug = "Hortofrutícola El Cariño"
    slug = Tenant._normalize_slug(given_slug)

    assert slug == 'hortofruticola_el_carino'


def test_tenant_normalize_slug_invalid() -> None:
    empty_slug = "  "
    with raises(ValueError):
        Tenant._normalize_slug(empty_slug)

    unsupported_slug = " あ "
    with raises(ValueError):
        resp = Tenant._normalize_slug(unsupported_slug)

from tutorark.application.general.suppliers import (
    TenantSupplier, MemoryTenantSupplier)


def test_tenant_supplier_methods() -> None:
    methods = TenantSupplier.__abstractmethods__  # type: ignore
    assert 'get_tenant' in methods
    assert 'ensure_tenant' in methods


def test_memory_tenant_supplier_search() -> None:
    tenant_supplier = MemoryTenantSupplier()
    tenants = tenant_supplier.search_tenants([])

    assert tenants == []


def test_memory_tenant_supplier_ensure_tenant() -> None:
    tenant_supplier = MemoryTenantSupplier()
    tenant_dict = tenant_supplier.ensure_tenant({
        'id': '001',
        'name': 'Knowark'
    })

    assert tenant_supplier.get_tenant('001')['name'] == 'Knowark'


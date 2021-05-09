import unicodedata
from abc import ABC, abstractmethod
from typing import Optional
from contextvars import ContextVar


class Tenant:
    def __init__(self, **attributes):
        self.id = attributes.get('id', '')
        self.name = attributes['name']
        self.email = attributes.get('email', '')
        self.active = attributes.get('active', True)
        self.slug = self._normalize_slug(attributes.get('slug', self.name))
        self.zone = attributes.get('zone', '')

    @staticmethod
    def _normalize_slug(slug: str) -> str:
        stripped_slug = slug.strip().replace(" ", "_").lower()
        normalized_slug = unicodedata.normalize(
            'NFKD', stripped_slug).encode('ascii', 'ignore').decode('utf-8')
        if not normalized_slug:
            raise ValueError("Invalid tenant 'slug' name.")
        return normalized_slug


class TenantProvider(ABC):
    """Tenant service."""

    @abstractmethod
    def setup(self, tenant: Tenant) -> None:
        "Setup current tenant method to be implemented."

    @property
    @abstractmethod
    def tenant(self) -> Tenant:
        """Get the current tenant"""

    @property
    def location(self) -> str:
        return self.tenant.slug

    @property
    def zone(self) -> str:
        return self.tenant.zone


tenant_var: ContextVar[Optional[Tenant]] = ContextVar('tenant', default=None)


class StandardTenantProvider(TenantProvider):

    def setup(self, tenant: Tenant) -> None:
        tenant_var.set(tenant)

    @property
    def tenant(self) -> Tenant:
        tenant = tenant_var.get()
        if not tenant:
            raise ValueError('No tenant has been set.')
        return tenant

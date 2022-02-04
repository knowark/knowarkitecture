from .tenant import *
from .tenant_provider import *


ZeroID = '00000000-0000-0000-0000-000000000000'


anonymous_tenant = Tenant(id=ZeroID, name='anonymous')


OneID = '11111111-1111-1111-1111-111111111111'


system_tenant = Tenant(id=OneID, name='system')

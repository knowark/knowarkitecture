import os
from typing import Dict, Any


Config = Dict[str, Any]

config: Config = {
    'port': int(os.environ.get('TUTORARK_PORT', 6291)),
    'auto': bool(os.environ.get('TUTORARK_AUTO', True)),
    'factory': os.environ.get('TUTORARK_FACTORY', 'CheckFactory'),
    'tenancy': {
        "dsn": os.environ.get('TUTORARK_TENANCY_DSN', (''))
    },
    'zones': {
        "default": {
            "dsn": os.environ.get('TUTORARK_ZONES_DEFAULT_DSN', (''))
        }
    }
}

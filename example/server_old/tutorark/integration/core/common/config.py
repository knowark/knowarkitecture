import os
from typing import Dict, Any


Config = Dict[str, Any]

config: Config = {
    'port': int(os.environ.get('TUTORARK_PORT') or 6291),
    'auto': bool(os.environ.get('TUTORARK_AUTO') or True),
    'factory': os.environ.get('TUTORARK_FACTORY') or 'CheckFactory',
    'tenancy': {
        "dsn": os.environ.get('TUTORARK_TENANCY_DSN') or ('')
    },
    'secrets': {
        'tokens': os.environ.get('SERTEMPOS_TOKENS_SECRET') or 'dev'
    },
    'zones': {
        "default": {
            "dsn": os.environ.get('TUTORARK_ZONES_DEFAULT_DSN') or ('')
        }
    }
}

def sanitize(config):
    if type(config) is dict:
        return {key: sanitize(value) for key, value in
                config.items() if value and sanitize(value)}
    return config

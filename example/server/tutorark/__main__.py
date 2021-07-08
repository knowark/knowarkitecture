"""
Tutorark entrypoint
"""
import sys
import asyncio
import uvloop
from injectark import Injectark
from .integration.core import config
from .integration.factories import factory_builder
from .presentation.system import Shell


async def main(args=None):  # pragma: no cover
    factory = factory_builder.build(config)
    injector = Injectark(factory=factory)
    await Shell(config, injector).run(args or [])


if __name__ == '__main__':  # pragma: no cover
    uvloop.install()
    asyncio.run(main(sys.argv[1:]))


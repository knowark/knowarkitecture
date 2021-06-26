from aiohttp import web
from typing import Callable, Type
from marshmallow import Schema
from ..helpers import get_request_filter, get_request_ids

class Resource:
    def __init__(self, schema: Type[Schema],
                 count_handler: Callable,
                 search_handler: Callable, 
                 add_handler: Callable,
                 delete_handler: Callable) -> None:
        self.schema = schema
        self.count_handler = count_handler
        self.search_handler = search_handler
        self.add_handler = add_handler
        self.delete_handler = delete_handler
        self.model = ''

    async def head(self, request) -> web.Response:
        domain, _, _ = await get_request_filter(request)
        total_count = await self.count_handler(dict(model=self.model,domain=domain))
        return web.Response(headers={'Total-Count': str(total_count['data'])})

    async def get(self, request: web.Request) -> web.Response:
        domain, limit, offset = await get_request_filter(request)
        records = await self.search_handler(dict(model=self.model,
            domain=domain, limit=limit, offset=offset))
        result = self.schema().dump(records['data'], many=True)
        return web.json_response(result)

    async def put(self, request: web.Request) -> web.Response:
        records = self.schema(
            many=True).loads(await request.text())
        result = await self.add_handler(dict(records=records))
        return web.json_response(result['data'],status=200)

    async def delete(self, request: web.Request) -> web.Response:
        ids = await get_request_ids(request)
        await self.delete_handler(dict(records=ids))
        return web.Response(status=204)

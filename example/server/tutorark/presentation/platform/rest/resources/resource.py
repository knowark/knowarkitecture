from aiohttp import web
from typing import Callable, Type
from validark import normalize,  validate
from ..helpers import get_request_filter, get_request_ids
from json import loads


class Resource:
    def __init__(self,
                 count_handler: Callable,
                 search_handler: Callable,
                 add_handler: Callable,
                 delete_handler: Callable) -> None:
        self.count_handler = count_handler
        self.search_handler = search_handler
        self.add_handler = add_handler
        self.delete_handler = delete_handler
        self.model = ''


    async def head(self, request) -> web.Response:
        domain, _, _ = await get_request_filter(request)
        total_count = await self.count_handler(
            dict(model=self.model,domain=domain))
        return web.Response(headers={'Total-Count':
                                     str(total_count['data'])})

    async def get(self, request: web.Request) -> web.Response:
        domain, limit, offset = await get_request_filter(request)
        result = await self.search_handler(
            dict(model=self.model, domain=domain,
                 limit=limit, offset=offset))
        return web.json_response(normalize(result))

    async def patch(self, request: web.Request) -> web.Response:
        records = loads(await request.text())
        result = await self.add_handler(normalize(records, 'snake'))
        return web.json_response(normalize(result), status=200)

    async def delete(self, request: web.Request) -> web.Response:
        ids = await get_request_ids(request)
        await self.delete_handler(ids)
        return web.Response(status=204)


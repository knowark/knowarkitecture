from abc import ABC, abstractmethod
from typing import List, Union, Dict, Any
from ...domain.services import RepositoryService
from ...domain.common.types import RecordList, QueryDomain
from ..common import dump


class StandardManager:
    def __init__(self, repository_service: RepositoryService) -> None:
        self.repository_service = repository_service

    async def set(self, entry: dict) -> dict:
        meta, data = entry['meta'], entry['data']
        repository = self.repository_service.resolve(meta.pop('model'))

        field = meta.get('field', 'id')
        items = await repository.find(data, field, init=True)
        for record, item in zip(data, items):
            item.transition(record)

        result = await repository.add(items)
        return {'data': [dump(item) for item in result]}

    async def remove(self, entry: dict) -> dict:
        meta, data = entry['meta'], entry.get('data', [])
        repository = self.repository_service.resolve(meta.pop('model'))

        items = [item for item in await repository.find(data) if item]

        result = await repository.remove(items)
        return {'data': result}

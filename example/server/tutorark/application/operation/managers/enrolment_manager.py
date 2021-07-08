from uuid import uuid4
from tutorark.application.domain.models.enrolment import Enrolment
from typing import List
from ...domain.services.repositories import EnrolmentRepository
from ...domain.common import RecordList


class EnrolmentManager:
    def __init__(self, enrolment_repository: EnrolmentRepository
                 ) -> None:
        self.enrolment_repository = enrolment_repository

    async def collect_enrolments(self, entry: dict) -> dict:
        records = entry['data']
        enrolment_ids = [
            enrolment.setdefault('id', uuid4()) for enrolment in records]

        existing_enrolments = {item.id: vars(item) for item in
                              await self.enrolment_repository.search(
                                   [('id','in', enrolment_ids)])}

        updated_records = []
        for record in records:
            existing = existing_enrolments.get(record['id'], {})
            existing.update(record)
            updated_records.append(existing)

        result = [vars(enrolment) for enrolment in
                  await self.enrolment_repository.add([
                      Enrolment(**updated_record)
                        for updated_record in updated_records])]

        return {'data':result}

    async def eliminate_enrolments(self, entry: dict) -> dict:
        records = entry['data']
        existing_enrolments = await self.enrolment_repository.search(
            [('id', 'in', records)])

        result = await self.enrolment_repository.remove(existing_enrolments)
        return {'data': result}

from tutorark.application.domain.models.enrolment import Enrolment
from typing import List, Dict
from ...domain.services.repositories import EnrolmentRepository
from ...domain.common import RecordList


class EnrolmentManager:
    def __init__(self, enrolment_repository: EnrolmentRepository
                 ) -> None:
        self.enrolment_repository = enrolment_repository

    async def collect_enrolments(self, entry: Dict) -> Dict:
        enrolments_ids = [
            items['id'] for items in
            entry.get('records') ]
        await self._delete_enrolments(enrolments_ids)
        result =  await self._create_enrolments(entry.get('records'))
        return {'data': result}

    async def eliminate_enrolments(self, entry: Dict) -> bool:
        return await self._delete_enrolments(entry.get('records'))


    async def _create_enrolments(self, enrolments_records: RecordList) -> RecordList:
        enrolments = await self.enrolment_repository.add([
            Enrolment(**enrolments_record)
            for enrolments_record in enrolments_records])
        return [vars(items) for items in enrolments]


    async def _delete_enrolments(self, enrolments_ids: List[str]) -> bool:
        enrolments = await self.enrolment_repository.search(
            [('id', 'in', enrolments_ids)])
        return await self.enrolment_repository.remove(enrolments)

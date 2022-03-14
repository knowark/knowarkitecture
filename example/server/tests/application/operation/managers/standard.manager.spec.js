import { describe, it, expect, beforeEach } from '@jest/globals'
import { MemoryPortal } from '#application/domain/services'
import { 
    StandardManager 
} from '#application/operation/managers/standard.manager.js'

describe('StandardManager', () => {
    let manager = null

    beforeEach(() => {
        const portal = new MemoryPortal()
        manager = new StandardManager({
            portal
        })
    })
    
    it('can be instantiated', () => {
        expect(manager).toBeTruthy()
    })

    it('adds items of the given model', async () => {
        const entry = {
            meta: {
                model: 'Course'
            },
            data: [
                { id: 'C001', name: 'Entrepreneurship' }
            ]
        }

        const data = manager.portal.get('Course').storer.data

        await manager.add(entry)

        expect(data['default']['C001'].name).toEqual('Entrepreneurship')
    })

    it('removes items of the given model', async () => {
        let entry = {
            meta: {
                model: 'Lesson'
            },
            data: [
                { id: 'L001', courseId: 'C001', name: 'Journey Design' }
            ]
        }
        const data = manager.portal.get('Lesson').storer.data
        await manager.add(entry)
        expect(data['default']['L001'].name).toEqual('Journey Design')

        entry = {
            meta:{
                model: 'Lesson'
            },
            data: [
                { id: 'L001' }
            ]
        }

        await manager.delete(entry)
        expect(data['default']['C001']).toBeUndefined()
    })
})

//from typing import Dict
//from pytest import fixture
//from tutorark.application.domain.models import (
    //Course, Enrolment, Lesson, Student, Teacher)
//from tutorark.application.domain.common import (
    //QueryParser, StandardTenantProvider, Tenant,
    //AuthProvider, StandardAuthProvider, User, QueryDomain)
//from tutorark.application.domain.services.repositories import (
    //RepositoryService,
    //CourseRepository, MemoryCourseRepository,
    //EnrolmentRepository, MemoryEnrolmentRepository,
    //LessonRepository, MemoryLessonRepository,
    //StudentRepository, MemoryStudentRepository,
    //TeacherRepository, MemoryTeacherRepository)
//from tutorark.application.operation.managers import StandardManager


//@fixture
//def parser():
    //return QueryParser()

//# PROVIDERS


//@fixture
//def auth_provider() -> AuthProvider:
    //auth_provider = StandardAuthProvider()
    //auth_provider.setup(User(id='001', name='johndoe'))
    //return auth_provider


//@fixture
//def tenant_provider():
    //tenant_provider = StandardTenantProvider()
    //tenant_provider.setup(Tenant(name="Default"))
    //return tenant_provider

//# REPOSITORIES


//@fixture
//def course_repository(
        //tenant_provider, auth_provider, parser) -> CourseRepository:
    //course_repository = MemoryCourseRepository(
        //parser, tenant_provider, auth_provider)
    //course_repository.load({
        //'default': {
            //'C001': Course(**{
                //'id': 'C001', 
                //'name': "Developer"
                //}),
            //'C002': Course(**{
                //'id': 'C002', 
                //'name': 'Data Base'
                //}),
        //}
    //})
    //return course_repository


//@fixture
//def student_repository(
        //tenant_provider, auth_provider, parser) -> StudentRepository:
    //student_repository = MemoryStudentRepository(
        //parser, tenant_provider, auth_provider)
    //student_repository.load({
        //'default': {
            //'S001': Student(**{
                //'id': 'S001', 
                //'name': "John Doe",
                //'identification':"123456789",
                //'email':"jdoe@example.com"
                //}),
            //'S002': Student(**{
                //'id': 'S002', 
                //'name': "Daniel Perez",
                //'identification':"987654321",
                //'email':"dperez@example.com"
                //}),
        //}
    //})
    //return student_repository


//@fixture
//def enrolment_repository(
        //tenant_provider, auth_provider, parser) -> EnrolmentRepository:
    //enrolment_repository = MemoryEnrolmentRepository(
        //parser, tenant_provider, auth_provider)
    //enrolment_repository.load({
        //'default': {
            //'E001': Enrolment(**{
                //'id': 'E001', 
                //'course_id': "C001",
                //"student_id":"S001"
                //}),
            //'E002': Enrolment(**{
                //'id': 'E002', 
                //'course_id': 'C002',
                //"student_id":"S002"
                //}),
        //}
    //})
    //return enrolment_repository

//@fixture
//def lesson_repository(
        //tenant_provider, auth_provider, parser) -> LessonRepository:
    //lesson_repository = MemoryLessonRepository(
        //parser, tenant_provider, auth_provider)
    //lesson_repository.load({
        //'default': {
            //'L001': Lesson(**{
                //'id': 'L001', 
                //'course_id': "C001",
                //"name":"Introduction"}),
            //'L002': Lesson(**{
                //'id': 'L002', 
                //'course_id': 'C002',
                //"name":"Topics"
                //}),
        //}
    //})
    //return lesson_repository

//@fixture
//def teacher_repository(
        //tenant_provider, auth_provider, parser) -> TeacherRepository:
    //teacher_repository = MemoryTeacherRepository(
        //parser, tenant_provider, auth_provider)
    //teacher_repository.load({
        //'default': {
            //'T001': Teacher(**{
                //'id': 'T001', 
                //'name': "Richard Roe",
                //"identification":"67890",
                //"email":"rroe@example.com"
                //}),
            //'T002': Teacher(**{
                //'id': 'T002', 
                //'name': "Alex Joe",
                //"identification":"54685",
                //"email":"ajoe@example.com"
                //}),
        //}
    //})
    //return teacher_repository


//@fixture
//def repository_service(course_repository, student_repository, 
                       //enrolment_repository, lesson_repository,
                       //teacher_repository):
    //return RepositoryService([course_repository, student_repository,
                              //enrolment_repository, lesson_repository,
                              //teacher_repository])

//# MANAGERS

//@fixture
//def standard_manager(
      //repository_service: RepositoryService) -> StandardManager:
    //return StandardManager(repository_service)

//def test_standard_manager_instantiation(
        //standard_manager: StandardManager) -> None:
    //assert hasattr(standard_manager, 'set')


//# course


//def test_standard_manager_instantiation(
        //standard_manager: StandardManager) -> None:
    //assert hasattr(standard_manager, 'set')


//async def test_standard_manager_set_create_course(
    //standard_manager: StandardManager) -> None:
    //course_id='C003'
    //course_data: RecordList = [{
        //'id': course_id,
        //'name': 'Example 3',
        //'description': 'Lorem Ipsum is simply dummy text'
    //}]

    //standard_data = getattr(
        //standard_manager.repository_service, 'registry')['Course']

    //items = getattr(
        //standard_data, 'data')['default']

    //assert len(items) == 2

    //await standard_manager.set({
        //"data": [],
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert len(items) == 2

    //await standard_manager.set({
        //"data": course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert items[course_id].id == course_id

    //assert len(items)==3

//async def test_standard_manager_update_course(
    //standard_manager: StandardManager) -> None:
    //course_id = 'C004'
    //course_data: RecordList = [{
        //'id': course_id,
        //'name': 'Example 4',
        //'description': 'Lorem Ipsum is simply dummy text'
    //}]

    //await standard_manager.set({
        //"data": course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //standard_data = getattr(
        //standard_manager.repository_service, 'registry')['Course']

    //items = getattr(
        //standard_data, 'data')['default']

    //assert len(items)==3

    //update_course_data: RecordList = [{
        //'id': course_id,
        //'name': 'Example 4 Update',
        //'description': 'Lorem Ipsum is simply dummy text'
    //}]

    //assert items[course_id].name == ('Example 4')

    //await standard_manager.set({
        //"data": update_course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert items[course_id].name == ('Example 4 Update')

    //assert len(items) == 3

//async def test_standard_manager_update_partial_course(
    //standard_manager: StandardManager) -> None:
    //course_id = 'C005'
    //course_data: RecordList = [{
        //'id': course_id,
        //'name': 'Example 5',
        //'description': 'Lorem Ipsum is simply dummy text'
    //}]

    //await standard_manager.set({
        //"data": course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //standard_data = getattr(
        //standard_manager.repository_service, 'registry')['Course']

    //items = getattr(
        //standard_data, 'data')['default']

    //assert len(items)==3

    //update_course_data: RecordList = [{
        //'id': course_id,
        //'name': 'Example 5 Update'
    //}]

    //assert items[course_id].name == ('Example 5')

    //await standard_manager.set({
        //"data": update_course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert items[course_id].name == ('Example 5 Update')

    //assert len(items) == 3

//async def test_standard_manager_update_all_cases_course(
    //standard_manager: StandardManager) -> None:
    //course_data: RecordList = [{
        //'id': 'C006',
        //'name': 'Example 6',
        //'description': 'Lorem Ipsum is simply dummy text'
    //},{
        //'id': 'C007',
        //'name': 'Example 7',
        //'description': 'Lorem Ipsum is simply dummy text'
    //}]

    //await standard_manager.set({
        //"data": course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //standard_data = getattr(
        //standard_manager.repository_service, 'registry')['Course']

    //items = getattr(
        //standard_data, 'data')['default']

    //update_course_data: RecordList = [{
        //'id': 'C006',
        //'name': 'Example 6 Update'
    //},{
        //'id': 'C007',
        //'name': 'Example 7 Update',
        //'description': 'Lorem Ipsum is simply dummy text Update'
    //},{
        //'id': 'C008',
        //'name': 'Example 8',
        //'description': 'Lorem Ipsum is simply dummy text'
    //},{
        //'id': 'C009',
        //'name': 'Example 9',
        //'description': 'Lorem Ipsum is simply dummy text' 
    //}]

    //assert items['C006'].name == ('Example 6')
    //assert items['C007'].name == ('Example 7')

    //assert len(items) == 4

    //await standard_manager.set({
        //"data": update_course_data,
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert items['C006'].name == ('Example 6 Update')

    //assert items['C007'].name == ('Example 7 Update')

    //assert len(items) == 6

//async def test_standard_manager_delete_course(
        //standard_manager: StandardManager) -> None:
    //course_id = 'C001'
    //standard_data = getattr(
        //standard_manager.repository_service, 'registry')['Course']

    //courses_data = getattr(
        //standard_data, 'data')['default']

    //assert len(courses_data) == 2

    //await standard_manager.remove({
        //"data": [course_id],
        //"meta":{
            //"model": "Course"
            //}
        //})

    //assert len(courses_data) == 1


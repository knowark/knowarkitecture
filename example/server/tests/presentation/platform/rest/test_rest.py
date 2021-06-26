from typing import Dict
from json import loads, dumps
from tutorark.presentation.platform.rest import RestApplication
from tutorark.presentation.platform.rest import rest as rest_module


async def test_rest_application_run(monkeypatch):
    called = False

    class web:
        @staticmethod
        async def _run_app(app, port=1234):
            nonlocal called
            called = True

    monkeypatch.setattr(rest_module, 'web', web)

    await RestApplication.run(None)

    assert called is True

# Root


async def test_root(app) -> None:
    response = await app.get('/')

    content = await response.text()

    assert response.status == 200
    assert 'Tutorark' in content


async def test_root_api(app) -> None:
    response = await app.get('/?api')
    data = await response.text()
    api = loads(data)

    assert 'openapi' in api
    assert api['info']['title'] == 'Tutorark'

# Course


async def test_courses_head(app, headers) -> None:
    response = await app.head('/courses', headers=headers)
    count = response.headers.get('Total-Count')
    assert int(count) == 2


async def test_courses_get_unauthorized(app) -> None:
    response = await app.get('/courses')
    content = await response.text()

    assert response.status == 401
    data_dict = loads(content)
    assert 'error' in data_dict


async def test_courses_get(app, headers) -> None:
    response = await app.get('/courses', headers=headers)
    content = await response.text()
    assert response.status == 200

    data_dict = loads(content)

    assert len(data_dict) == 2
    assert data_dict[0]['id'] == '1'


async def test_courses_get_route_filter(app, headers) -> None:
    response = await app.get(
        '/courses?filter=[["description", "=", "Lorem Ipsum is simply dummy text of the "]]',
        headers=headers)
    content = await response.text()
    data_dict = loads(content)
    assert len(data_dict) == 2


async def test_courses_put(app, headers) -> None:
    courses_data = dumps([{
        'id': 'C001',
        'name': 'Developer',
        'description': 'Lorem Ipsum is simply dummy text of the printing',
    }])

    response = await app.put('/courses',
                             data=courses_data, headers=headers)
    content = await response.text()
    assert response.status == 200


async def test_courses_delete(app, headers) -> None:
    response = await app.delete('/courses/C001', headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/courses', headers=headers)
    data_dict = loads(await response.text())

    assert len(data_dict) == 2


async def test_courses_delete_body(app, headers) -> None:
    ids = dumps(["2"])
    response = await app.delete(
        '/courses', data=ids, headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/courses', headers=headers)
    data_dict = loads(await response.text())

    assert  len(data_dict)  == 1


# Enrolments

async def test_enrolmentss_head(app, headers) -> None:
    response = await app.head('/enrolments', headers=headers)
    count = response.headers.get('Total-Count')
    assert int(count) == 2


async def test_enrolmentss_get_unauthorized(app) -> None:
    response = await app.get('/enrolments')
    content = await response.text()

    assert response.status == 401
    data_dict = loads(content)
    assert 'error' in data_dict


async def test_enrolments_get(app, headers) -> None:
    response = await app.get('/enrolments', headers=headers)
    content = await response.text()
    assert response.status == 200

    data_dict = loads(content)

    assert len(data_dict) == 2
    assert data_dict[0]['id'] == '1'


async def test_enrolments_get_route_filter(app, headers) -> None:
    response = await app.get(
        '/enrolments?filter=[["courseId", "=", "C001"]]',
        headers=headers)
    content = await response.text()
    data_dict = loads(content)
    assert len(data_dict) == 0


async def test_enrolments_put(app, headers) -> None:
    enrolments_data = dumps([{
        "id": "1",
        "courseId": "C001",
        "studentId": "S001",
    }])

    response = await app.put('/enrolments',
                             data=enrolments_data, headers=headers)
    content = await response.text()
    assert response.status == 200


async def test_enrolments_delete(app, headers) -> None:
    response = await app.delete('/enrolments/1', headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/enrolments', headers=headers)
    data_dict = loads(await response.text())

    assert len(data_dict) == 1


async def test_enrolments_delete_body(app, headers) -> None:
    ids = dumps(["2"])
    response = await app.delete(
        '/enrolments', data=ids, headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/enrolments', headers=headers)
    data_dict = loads(await response.text())

    assert  len(data_dict)  == 1





# Lesson


async def test_lessons_head(app, headers) -> None:
    response = await app.head('/lessons', headers=headers)
    count = response.headers.get('Total-Count')
    assert int(count) == 2


async def test_lessons_get_unauthorized(app) -> None:
    response = await app.get('/lessons')
    content = await response.text()

    assert response.status == 401
    data_dict = loads(content)
    assert 'error' in data_dict


async def test_lessons_get(app, headers) -> None:
    response = await app.get('/lessons', headers=headers)
    content = await response.text()
    assert response.status == 200

    data_dict = loads(content)

    assert len(data_dict) == 2
    assert data_dict[0]['id'] == '1'


async def test_lessons_get_route_filter(app, headers) -> None:
    response = await app.get(
        '/lessons?filter=[["name", "=", "Understanding Aristoteles"]]',
        headers=headers)
    content = await response.text()
    data_dict = loads(content)
    assert len(data_dict) == 1


async def test_lessons_put(app, headers) -> None:
    lessons_data = dumps([{
        "id": "1",
        "courseId": "1",
        "name": "Understanding Pitagoras",
    }])

    response = await app.put('/lessons',
                             data=lessons_data, headers=headers)
    content = await response.text()
    assert response.status == 200


async def test_lessons_delete(app, headers) -> None:
    response = await app.delete('/lessons/1', headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/lessons', headers=headers)
    data_dict = loads(await response.text())

    assert len(data_dict) == 1


async def test_lessons_delete_body(app, headers) -> None:
    ids = dumps(["2"])
    response = await app.delete(
        '/lessons', data=ids, headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/lessons', headers=headers)
    data_dict = loads(await response.text())

    assert  len(data_dict)  == 1

# Student


async def test_students_head(app, headers) -> None:
    response = await app.head('/students', headers=headers)
    count = response.headers.get('Total-Count')
    assert int(count) == 2


async def test_students_get_unauthorized(app) -> None:
    response = await app.get('/students')
    content = await response.text()

    assert response.status == 401
    data_dict = loads(content)
    assert 'error' in data_dict


async def test_students_get(app, headers) -> None:
    response = await app.get('/students', headers=headers)
    content = await response.text()
    assert response.status == 200

    data_dict = loads(content)

    assert len(data_dict) == 2
    assert data_dict[0]['id'] == '1'


async def test_students_get_route_filter(app, headers) -> None:
    response = await app.get(
        '/students?filter=[["name", "=", "Jose Martinez"]]',
        headers=headers)
    content = await response.text()
    data_dict = loads(content)
    assert len(data_dict) == 1


async def test_students_put(app, headers) -> None:
    students_data = dumps([{
        "id": "1",
        "name": "Jose Martinez",
        "identification": "123456789",
        "email":"jose@example.com",
    }])

    response = await app.put('/students',
                             data=students_data, headers=headers)
    content = await response.text()
    assert response.status == 200


async def test_students_delete(app, headers) -> None:
    response = await app.delete('/students/1', headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/students', headers=headers)
    data_dict = loads(await response.text())

    assert len(data_dict) == 1


async def test_students_delete_body(app, headers) -> None:
    ids = dumps(["2"])
    response = await app.delete(
        '/students', data=ids, headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/students', headers=headers)
    data_dict = loads(await response.text())

    assert  len(data_dict)  == 1

# Teacher


async def test_teachers_head(app, headers) -> None:
    response = await app.head('/teachers', headers=headers)
    count = response.headers.get('Total-Count')
    assert int(count) == 2


async def test_teachers_get_unauthorized(app) -> None:
    response = await app.get('/teachers')
    content = await response.text()

    assert response.status == 401
    data_dict = loads(content)
    assert 'error' in data_dict


async def test_teachers_get(app, headers) -> None:
    response = await app.get('/teachers', headers=headers)
    content = await response.text()
    assert response.status == 200

    data_dict = loads(content)

    assert len(data_dict) == 2
    assert data_dict[0]['id'] == '1'


async def test_teachers_get_route_filter(app, headers) -> None:
    response = await app.get(
        '/teachers?filter=[["name", "=", "Duban Feliz"]]',
        headers=headers)
    content = await response.text()
    data_dict = loads(content)
    assert len(data_dict) == 1


async def test_teachers_put(app, headers) -> None:
    teachers_data = dumps([{
        "id": "1",
        "name": "Duban Feliz",
        "identification": "5469871",
        "email":"duban@example.com",
    }])

    response = await app.put('/teachers',
                             data=teachers_data, headers=headers)
    content = await response.text()
    assert response.status == 200


async def test_teachers_delete(app, headers) -> None:
    response = await app.delete('/teachers/1', headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/teachers', headers=headers)
    data_dict = loads(await response.text())

    assert len(data_dict) == 1


async def test_teachers_delete_body(app, headers) -> None:
    ids = dumps(["2"])
    response = await app.delete(
        '/teachers', data=ids, headers=headers)
    content = await response.text()
    assert response.status == 204

    response = await app.get('/teachers', headers=headers)
    data_dict = loads(await response.text())

    assert  len(data_dict)  == 1
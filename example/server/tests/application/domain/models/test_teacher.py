from pytest import fixture
from tutorark.application.domain.models import Teacher

@fixture
def teacher() -> Teacher:
    return Teacher(
        id='T001',
        name='Richard Roe',
        identification='12345',
        email='rroe@example.com'
    )

def test_teacher_creation(teacher: Teacher) -> None:
    assert isinstance(teacher, Teacher)

def test_teacher_default_attributes(teacher: Teacher) -> None:
    assert teacher.id == "T001"
    assert teacher.name == "Richard Roe"
    assert teacher.identification == "12345"
    assert teacher.email == "rroe@example.com"

def test_teacher_transition():
    teacher_dict_update = {
        "id": "T001",
        "name": "Richard Roe",
        "identification": "12345",
        "email":"rroe@example.com"
    }

    state_update = {
        "id": "T001",
        "name": "Example 1"
    }
    teacher = Teacher(**teacher_dict_update)
    result = teacher.transition(state_update)

    assert result.name == "Example 1"
    
    teacher_dict_activated = {
        "id": "T002",
        "name": "Example 2",
        "identification": "54321",
        "email":"example2@example.com",
        "status":""
    }

    state_activated = {
        "id": "T002",
        "status": "activated"
    }
    teacher = Teacher(**teacher_dict_activated)
    result = teacher.transition(state_activated)

    assert result.status == "activated"

    teacher_dict_disabled = {
        "id": "T003",
        "name": "Example 3",
        "identification": "654987",
        "email":"example3@example.com",
        "status":"activated"
    }

    state_disabled = {
        "id": "T003",
        "status": "disabled"
    }
    teacher = Teacher(**teacher_dict_disabled)
    result = teacher.transition(state_disabled)

    assert result.status == "disabled"
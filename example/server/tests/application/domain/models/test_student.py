from pytest import fixture
from tutorark.application.domain.models import Student

@fixture
def student() -> Student:
    return Student(
        id='S001',
        name='John Doe',
        identification='12345',
        email='jdoe@example.com'
    )

def test_student_creation(student: Student) -> None:
    assert isinstance(student, Student)

def test_student_default_attributes(student: Student) -> None:
    assert student.id == "S001"
    assert student.name == "John Doe"
    assert student.identification == "12345"
    assert student.email == "jdoe@example.com"

def test_student_transition():
    student_dict_update = {
        "id": "S001",
        "name": "John Doe",
        "identification": "12345",
        "email":"jdoe@example.com"
    }

    state_update = {
        "id": "S001",
        "name": "Example 1"
    }
    student = Student(**student_dict_update)
    result = student.transition(state_update)

    assert result.name == "Example 1"
    
    student_dict_activated = {
        "id": "S002",
        "name": "Example 2",
        "identification": "54321",
        "email":"example2@example.com",
        "status":""
    }

    state_activated = {
        "id": "S002",
        "status": "activated"
    }
    student = Student(**student_dict_activated)
    result = student.transition(state_activated)

    assert result.status == "activated"

    student_dict_disabled = {
        "id": "S003",
        "name": "Example 3",
        "identification": "654987",
        "email":"example3@example.com",
        "status":"activated"
    }

    state_disabled = {
        "id": "S003",
        "status": "disabled"
    }
    student = Student(**student_dict_disabled)
    result = student.transition(state_disabled)

    assert result.status == "disabled"

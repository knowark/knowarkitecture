from pytest import fixture
from tutorark.application.domain.models import Course

@fixture
def course() -> Course:
    return Course(
        id='C001',
        name='Ancient Philosophy',
        description='The study of Greek and Roman philosophers'
    )

def test_course_creation(course: Course) -> None:
    assert isinstance(course, Course)

def test_course_default_attributes(course: Course) -> None:
    assert course.id == "C001"
    assert course.name == "Ancient Philosophy"
    assert course.description == "The study of Greek and Roman philosophers"

def test_course_transition():
    course_dict_update = {
        "id": "C001",
        "name": "Ancient Philosophy",
        "description": "The study of Greek and Roman philosophers"
    }

    state_update = {
        "id": "C001",
        "name": "Example 1"
    }
    course = Course(**course_dict_update)
    result = course.transition(state_update)

    assert result.name == "Example 1"
    
    course_dict_initiated = {
        "id": "C002",
        "name": "Example 2",
        "description": "Lorem Ipsum is simply dummy text",
        "status":""
    }

    state_initiated = {
        "id": "C002",
        "status": "initiated"
    }
    course = Course(**course_dict_initiated)
    result = course.transition(state_initiated)

    assert result.status == "initiated"

    course_dict_finalized = {
        "id": "C003",
        "name": "Example 3",
        "description": "Lorem Ipsum is simply dummy text",
        "status":"initiated"
    }

    state_finalized = {
        "id": "C003",
        "status": "finalized"
    }
    course = Course(**course_dict_finalized)
    result = course.transition(state_finalized)

    assert result.status == "finalized"
 
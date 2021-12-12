from pytest import fixture
from tutorark.application.domain.models import Lesson

@fixture
def lesson() -> Lesson:
    return Lesson(
        id='L001',
        course_id='C001',
        name='Understanding Socrates'
    )

def test_lesson_creation(lesson: Lesson) -> None:
    assert isinstance(lesson, Lesson)

def test_lesson_default_attributes(lesson: Lesson) -> None:
    assert lesson.id == "L001"
    assert lesson.course_id == "C001"
    assert lesson.name == "Understanding Socrates"

def test_lesson_transition():
    lesson_dict_update = {
        "id": "L001",
        "course_id": "C001",
        "name": "Understanding Socrates",
    }

    state_update = {
        "id": "L001",
        "name": "Example 1"
    }
    lesson = Lesson(**lesson_dict_update)
    result = lesson.transition(state_update)

    assert result.name == "Example 1"
    
    lesson_dict_initiated = {
        "id": "L002",
        "course_id": "C002",
        "name": "Example 2",
        "status":""
    }

    state_initiated = {
        "id": "L002",
        "status": "initiated"
    }
    lesson = Lesson(**lesson_dict_initiated)
    result = lesson.transition(state_initiated)

    assert result.status == "initiated"

    lesson_dict_finalized = {
        "id": "L003",
        "course_id": "C003",
        "name": "Example 3",
        "status":"initiated"
    }

    state_finalized = {
        "id": "L003",
        "status": "finalized"
    }
    lesson = Lesson(**lesson_dict_finalized)
    result = lesson.transition(state_finalized)

    assert result.status == "finalized"

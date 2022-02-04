from pytest import fixture
from tutorark.application.domain.models import Enrolment

@fixture
def enrolment() -> Enrolment:
    return Enrolment(
        id='E001',
        course_id='C001',
        student_id='S001'
    )

def test_enrolment_creation(enrolment: Enrolment) -> None:
    assert isinstance(enrolment, Enrolment)

def test_enrolment_default_attributes(enrolment: Enrolment) -> None:
    assert enrolment.id == "E001"
    assert enrolment.course_id == "C001"
    assert enrolment.student_id == "S001"

def test_enrolment_transition():
    enrolment_dict_update = {
        "id": "E001",
        "course_id": "C001",
        "student_id": "S001",
    }

    state_update = {
        "id": "E001",
        "course_id": "C0010"
    }
    enrolment = Enrolment(**enrolment_dict_update)
    result = enrolment.transition(state_update)

    assert result.course_id == "C0010"
    
    enrolment_dict_pre_registered = {
        "id": "E002",
        "course_id": "C002",
        "student_id": "S002",
        "status":""
    }

    state_pre_registered = {
        "id": "E002",
        "status": "pre_registered"
    }
    enrolment = Enrolment(**enrolment_dict_pre_registered)
    result = enrolment.transition(state_pre_registered)

    assert result.status == "pre_registered"

    enrolment_dict_registered = {
        "id": "E003",
        "course_id": "C003",
        "student_id": "S003",
        "status":"pre_registered"
    }

    state_registered = {
        "id": "E003",
        "status": "registered"
    }
    enrolment = Enrolment(**enrolment_dict_registered)
    result = enrolment.transition(state_registered)

    assert result.status == "registered"

    enrolment_dict_selected = {
        "id": "E004",
        "course_id": "C004",
        "student_id": "S004",
        "status":"registered"
    }

    state_selected = {
        "id": "E004",
        "status": "selected"
    }
    enrolment = Enrolment(**enrolment_dict_selected)
    result = enrolment.transition(state_selected)

    assert result.status == "selected"

    enrolment_dict_rejected = {
        "id": "E005",
        "course_id": "C005",
        "student_id": "S005",
        "status":"registered"
    }

    state_rejected = {
        "id": "E005",
        "status": "rejected"
    }
    enrolment = Enrolment(**enrolment_dict_rejected)
    result = enrolment.transition(state_rejected)

    assert result.status == "rejected"
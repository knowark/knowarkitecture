from tutorark.application.domain import Enrolment


def test_enrolment_instantiation():
    enrolment = Enrolment(course_id='C001', student_id='S001')

    assert enrolment is not None


def test_enrolment_attributes():
    enrolment = Enrolment(
        id='E001',
        course_id='C001',
        student_id='S001')

    assert enrolment.id == 'E001'
    assert enrolment.course_id == 'C001'
    assert enrolment.student_id == 'S001'

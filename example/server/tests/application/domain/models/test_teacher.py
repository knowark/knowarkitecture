from tutorark.application.domain import Teacher


def test_teacher_instantiation():
    teacher = Teacher(name='Richard Roe')

    assert teacher is not None


def test_teacher_attributes():
    teacher = Teacher(
        id='T001',
        name='Richard Roe',
        identification='67890',
        email='rroe@example.com')

    assert teacher.id == 'T001'
    assert teacher.name == 'Richard Roe'
    assert teacher.identification == '67890'
    assert teacher.email == 'rroe@example.com'

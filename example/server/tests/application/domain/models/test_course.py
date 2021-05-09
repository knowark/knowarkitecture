from tutorark.application.domain import Course


def test_course_instantiation():
    course = Course(name='Web Development')

    assert course is not None


def test_course_attributes():
    course = Course(
        id='C001',
        name='Ancient Philosophy',
        description='The study of Greek and Roman philosophers')

    assert course.id == 'C001'
    assert course.name == 'Ancient Philosophy'
    assert course.description == (
        'The study of Greek and Roman philosophers')

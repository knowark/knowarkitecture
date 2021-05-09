from tutorark.application.domain import Lesson


def test_lesson_instantiation():
    lesson = Lesson(
        course_id='C001', name='Knowing Thales of Miletus')

    assert lesson is not None


def test_lesson_attributes():
    lesson = Lesson(
        id='L002',
        course_id='C001',
        name='Understanding Socrates')

    assert lesson.id == 'L002'
    assert lesson.course_id == 'C001'
    assert lesson.name == 'Understanding Socrates'

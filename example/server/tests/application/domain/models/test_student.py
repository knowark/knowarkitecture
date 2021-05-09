from tutorark.application.domain import Student


def test_student_instantiation():
    student = Student(name='John Doe')

    assert student is not None


def test_student_attributes():
    student = Student(
        id='S001',
        name='John Doe',
        identification='12345',
        email='jdoe@example.com')

    assert student.id == 'S001'
    assert student.name == 'John Doe'
    assert student.identification == '12345'
    assert student.email == 'jdoe@example.com'

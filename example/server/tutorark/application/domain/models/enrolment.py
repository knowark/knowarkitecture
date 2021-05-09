from modelark import Entity


class Enrolment(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.course_id = attributes['course_id']
        self.student_id = attributes['student_id']

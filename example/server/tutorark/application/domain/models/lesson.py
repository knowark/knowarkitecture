from modelark import Entity


class Lesson(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.course_id = attributes['course_id']
        self.name = attributes['name']

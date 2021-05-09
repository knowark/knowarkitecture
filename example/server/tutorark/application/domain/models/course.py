from modelark import Entity


class Course(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.name = attributes['name']
        self.description = attributes.get('description', '')

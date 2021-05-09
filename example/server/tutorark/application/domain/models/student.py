from modelark import Entity


class Student(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.name = attributes['name']
        self.identification = attributes.get('identification', '')
        self.email = attributes.get('email', '')

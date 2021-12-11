from modelark import Entity


class Student(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.name = attributes['name']
        self.identification = attributes.get('identification', '')
        self.email = attributes.get('email', '')

    @property
    def transitions(self):
        return TRANSITIONS_MAP[self.status]

    def transition(self, state: dict):
        if state.get('status'):

            target = self.transitions.get(state.get('status'), {})
            if target.get('name') == "activate":
                self.__dict__.update(state)

            if target.get('name') == "deactivate":
                self.__dict__.update(state)

        self.__dict__.update(state)

        return self

TRANSITIONS_MAP = {
    "":{
        "activated":{
            "name": "activate",
            "description": "text"
        },
    },
    "activated":{
        "disabled":{
            "name": "deactivate",
            "description": "text"
        }
    },
    "disabled":{
        "activated":{
            "name": "activate",
            "description": "text"
        },
    },
}
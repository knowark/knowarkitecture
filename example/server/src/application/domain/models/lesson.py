from modelark import Entity


class Lesson(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.course_id = attributes['course_id']
        self.name = attributes['name']

    @property
    def transitions(self):
        return TRANSITIONS_MAP[self.status]

    def transition(self, state: dict):
        if state.get('status'):

            target = self.transitions.get(state.get('status'), {})
            if target.get('name') == "start":
                self.__dict__.update(state)

            if target.get('name') == "finalize":
                self.__dict__.update(state)

        self.__dict__.update(state)

        return self

TRANSITIONS_MAP = {
    "":{
        "initiated":{
            "name": "start",
            "description": "text"
        },
    },
    "initiated":{
        "finalized":{
            "name": "finalize",
            "description": "text"
        }
    },
}
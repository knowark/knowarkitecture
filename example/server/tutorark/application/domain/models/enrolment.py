from modelark import Entity


class Enrolment(Entity):
    def __init__(self, **attributes):
        super().__init__(**attributes)
        self.course_id = attributes['course_id']
        self.student_id = attributes['student_id']

    @property
    def transitions(self):
        return TRANSITIONS_MAP[self.status]

    def transition(self, state: dict):
        if state.get('status'):

            target = self.transitions.get(state.get('status'), {})
            if target.get('name') == "pre_register":
                self.__dict__.update(state)

            if target.get('name') == "register":
                self.__dict__.update(state)

            if target.get('name') == "select":
                self.__dict__.update(state)

            if target.get('name') == "refuse":
                self.__dict__.update(state)
                
        self.__dict__.update(state)

        return self

TRANSITIONS_MAP = {
    "":{
        "pre_registered":{
            "name": "pre_register",
            "description": "text"
        },
    },
    "pre_registered":{
        "registered":{
            "name": "register",
            "description": "text"
        }
    },
    "registered":{
        "selected":{
            "name": "select",
            "description": "text"
        },
        "rejected":{
            "name": "refuse",
            "description": "text"
        },
    },
}
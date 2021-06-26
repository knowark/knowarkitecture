from marshmallow import fields, EXCLUDE
from .entity import EntitySchema


class UserSchema(EntitySchema):
    class Meta:
        unknown = EXCLUDE

    name = fields.Str(example="Jaime Arango")
    email = fields.Str(example="jarango@ops.servagro.com.co")
    attributes = fields.Mapping()
    authorization = fields.Mapping()

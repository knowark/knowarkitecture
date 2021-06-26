from marshmallow import fields
from .entity import EntitySchema


class TeacherSchema(EntitySchema):
    name = fields.Str(data_key='name', example="Rik Joe")
    identification = fields.Str(
        data_key='identification', example="987654321")
    email = fields.Str(data_key='email', example="rjoe@example.com")
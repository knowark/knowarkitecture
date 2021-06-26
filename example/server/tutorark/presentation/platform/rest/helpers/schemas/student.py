from marshmallow import fields
from .entity import EntitySchema


class StudentSchema(EntitySchema):
    name = fields.Str(data_key='name', example="Johh Joe")
    identification = fields.Str(
        data_key='identification', example="123456789")
    email = fields.Str(data_key='email', example="jjoe@example.com")
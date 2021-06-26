from marshmallow import fields
from .entity import EntitySchema


class CourseSchema(EntitySchema):
    name = fields.Str(data_key='name', example="Developer")
    description = fields.Str(
        data_key='description', example="Lorem Ipsum is simply dummy text of the printing")

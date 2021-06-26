from marshmallow import fields
from .entity import EntitySchema


class LessonSchema(EntitySchema):
    name = fields.Str(data_key='name', example="Introduction")
    course_id = fields.Str(data_key='courseId', example="1")
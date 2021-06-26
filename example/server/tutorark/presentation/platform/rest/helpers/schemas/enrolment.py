from marshmallow import fields
from .entity import EntitySchema


class EnrolmentSchema(EntitySchema):
    course_id = fields.Str(data_key='courseId', example="1")
    student_id = fields.Str(data_key='studentId', example="1")

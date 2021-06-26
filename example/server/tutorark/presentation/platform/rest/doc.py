from apispec import APISpec
from apispec.ext.marshmallow import MarshmallowPlugin
from .helpers import (CourseSchema, EnrolmentSchema, 
                        LessonSchema, StudentSchema, TeacherSchema)



def create_spec() -> APISpec:
    spec = APISpec(
        title="Tutorark",
        version="1.0.0",
        openapi_version="3.0.2",
        plugins=[MarshmallowPlugin()],
        info=dict(
            description="Proser Server",
            contact=dict(
                name="Knowark",
                url="https://www.knowark.com"
            )))

    _register_schemas(spec)
    _register_paths(spec)

    return spec


def _register_schemas(spec):
    spec.components.schema("Course", schema=CourseSchema)
    spec.components.schema("Enrolment", schema=EnrolmentSchema)
    spec.components.schema("Lesson", schema=LessonSchema)
    spec.components.schema("Student", schema=StudentSchema)
    spec.components.schema("Teacher", schema=TeacherSchema)


def _register_paths(spec):
    resources = [
        ('courses', 'Course'),
        ('enrolments', 'Enrolment'),
        ('lessons', 'Lesson'),
        ('students', 'Student'),
        ('teachers', 'Teacher'),
    ]
    for resource in resources:
        _append_path(spec, *resource)


def _append_path(spec, endpoint, schema):
    spec.path(
        path=f'/{endpoint}',
        operations={
            'get': {
                'tags': [schema],
                'responses': _respond(f"Get all {endpoint}", schema)
            },
            'put': {
                'tags': [schema],
                'responses': _respond(f"Modify {endpoint}", schema)
            },
            'delete': {
                'tags': [schema],
                'responses': _respond(f"Delete {endpoint}", schema)
            }
        }
    )


def _respond(description, schema, status='200'):
    return {
        status: {
            "description": description,
            "content": {
                "application/json": {
                    "schema": {
                        "type": "array",
                        "items": {
                            "$ref": f"#/components/schemas/{schema}"
                        }
                    }
                }
            }
        }
    }

export const operations = {
    // Course
    "coursesGetId": {
        'actions': {
            'default':{
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Course'}
            }
        }
    },
    'coursesPatchId': {
        'actions': {
            'default':{
                'handler': 'StandardManager.set',
                'meta': {'model': 'Course'}
            }
        }
    },
    'coursesDeleteId': {
        'actions': {
            'default':{
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Course'}
            }
        }
    },

    // Enrolment
    "enrolmentsGetId": {
        'actions':{
            'default':{
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Enrolment'}
            }
        }
    },
    'enrolmentsPatchId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.set',
                'meta': {'model': 'Enrolment'}
            }
        }
    },
    'enrolmentsDeleteId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Enrolment'}
            }
        }
    },

    // Lesson
    "lessonsGetId": {
        'actions':{
            'default':{
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Lesson'}
            }
        }
    },
    'lessonsPatchId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.set',
                'meta': {'model': 'Lesson'}
            }
        }
    },
    'lessonsDeleteId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Lesson'}
            }
        }
    },

    // Student
    "studentsGetId": {
        'actions':{
            'default':{
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Student'}
            }
        }
    },
    'studentsPatchId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.set',
                'meta': {'model': 'Student'}
            }
        }
    },
    'studentsDeleteId': {
        'actions':{
            'default':{
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Student'}
            }
        }
    },

    // Teacher
    "teachersGetId": {
        'actions': {
            'default': {
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Teacher'}
            }
        }
    },
    'teachersPatchId': {
        'actions': {
            'default': {
                'handler': 'StandardManager.set',
                'meta': {'model': 'Teacher'}
            }
        }
    },
    'teachersDeleteId': {
        'actions': {
            'default': {
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Teacher'}
            }
        }
    },

    // Setting
    "settingsGetId": {
        'actions': {
            'default': {
                'handler': 'StandardInformer.search',
                'meta': {'model': 'Setting'}
            }
        }
    },
    'settingsPatchId': {
        'actions': {
            'default': {
                'handler': 'StandardManager.set',
                'meta': {'model': 'Setting'}
            }
        }
    },
    'settingsDeleteId': {
        'actions': {
            'default': {
                'handler': 'StandardManager.remove',
                'meta': {'model': 'Setting'}
            }
        }
    }
}

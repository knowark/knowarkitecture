CREATE TABLE "Course" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR NOT NULL,
   "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "createdBy" VARCHAR NOT NULL,
   "updatedBy" VARCHAR NOT NULL,

   "name" VARCHAR NOT NULL,
   "description" VARCHAR NOT NULL
);

CREATE TABLE "Enrolment" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR NOT NULL,
   "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "createdBy" VARCHAR NOT NULL,
   "updatedBy" VARCHAR NOT NULL,

   "courseId" UUID,
   "studentId" UUID
);
CREATE INDEX ON "Enrolment" ("courseId");
CREATE INDEX ON "Enrolment" ("studentId");

CREATE TABLE "Lesson" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR NOT NULL,
   "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "createdBy" VARCHAR NOT NULL,
   "updatedBy" VARCHAR NOT NULL,

   "courseId" UUID,
   "name" VARCHAR NOT NULL
);
CREATE INDEX ON "Lesson" ("courseId");

CREATE TABLE "Setting" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR NOT NULL,
   "createdAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "updatedAt" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
   "createdBy" VARCHAR NOT NULL,
   "updatedBy" VARCHAR NOT NULL,

   "userId" UUID,
   "type" VARCHAR NOT NULL,
   "name" VARCHAR NOT NULL,
   "value" VARCHAR NOT NULL,
   "description" VARCHAR NOT NULL
);
CREATE INDEX ON "Setting" ("userId");

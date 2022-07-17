CREATE TABLE "Course" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "name" VARCHAR NOT NULL,
   "description" VARCHAR NOT NULL
);

CREATE TABLE "Enrolment" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "courseId" UUID,
   "studentId" UUID
);
CREATE INDEX ON "Enrolment" ("courseId");
CREATE INDEX ON "Enrolment" ("studentId");

CREATE TABLE "Lesson" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "courseId" UUID,
   "name" VARCHAR NOT NULL
);
CREATE INDEX ON "Lesson" ("courseId");

CREATE TABLE "Setting" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "userId" UUID,
   "type" VARCHAR NOT NULL,
   "name" VARCHAR NOT NULL,
   "value" VARCHAR NOT NULL,
   "description" VARCHAR NOT NULL
);
CREATE INDEX ON "Setting" ("userId");

CREATE TABLE "Student" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "name" VARCHAR NOT NULL,
   "identification" VARCHAR NOT NULL,
   "email" VARCHAR NOT NULL
);

CREATE TABLE "Teacher" (
   "id" UUID PRIMARY KEY,
   "status" VARCHAR,
   "createdAt" TIMESTAMPTZ,
   "updatedAt" TIMESTAMPTZ,
   "createdBy" UUID,
   "updatedBy" UUID,

   "name" VARCHAR NOT NULL,
   "identification" VARCHAR NOT NULL,
   "email" VARCHAR NOT NULL
);

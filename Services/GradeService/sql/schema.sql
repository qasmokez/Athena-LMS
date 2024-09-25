-- Setup Tables
\connect gradedb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS grade;
CREATE TABLE grade (
    student_uuid UUID, -- internal id
    data jsonb
);

-- Security
GRANT SELECT ON grade TO admin;
GRANT UPDATE ON grade TO admin;

GRANT SELECT ON grade TO gradepool;
GRANT INSERT ON grade TO gradepool;
GRANT UPDATE ON grade TO gradepool;

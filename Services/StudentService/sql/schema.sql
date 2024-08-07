-- Setup Tables
\connect studentdb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS student;
CREATE TABLE student (
    studentid UUID, -- internal id
    data jsonb
);

DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
    studentid UUID, -- internal id
    data jsonb
);

DROP TABLE IF EXISTS honors;
CREATE TABLE honors (
    studentid UUID, -- internal id
    data jsonb
);

-- Additional
GRANT SELECT ON student TO admin;
GRANT UPDATE ON student TO admin;
GRANT SELECT ON honors TO admin;
GRANT UPDATE ON honors TO admin;
GRANT SELECT ON student TO studentpool;
GRANT INSERT ON student TO studentpool;
GRANT UPDATE ON student TO studentpool;
GRANT SELECT ON honors TO studentpool;
GRANT INSERT ON honors TO studentpool;
GRANT UPDATE ON honors TO studentpool;


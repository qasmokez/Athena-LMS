-- Setup Tables
\connect gradedb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS classes;
CREATE TABLE classes
(
    id         BIGSERIAL PRIMARY KEY,
    type       SMALLINT DEFAULT 0,
    grade_id   INTEGER NOT NULL DEFAULT 0, 
    name       VARCHAR(55) NULL, -- 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
);

-- Security
GRANT SELECT ON classes TO admin;
GRANT UPDATE ON classes TO admin;

GRANT SELECT ON classes TO classpool;
GRANT INSERT ON classes TO classpool;
GRANT UPDATE ON classes TO classpool;
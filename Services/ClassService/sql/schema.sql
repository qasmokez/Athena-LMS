-- Setup Tables
\connect classdb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS classes;
CREATE TABLE classes
(
    id         BIGSERIAL PRIMARY KEY,
    type       SMALLINT DEFAULT 0,
    classes_id INTEGER NOT NULL, 
    grade_id   INTEGER NOT NULL, 
    name       VARCHAR(55) NULL, -- 
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP 
);

-- Create tables
DROP TABLE IF EXISTS grade;
CREATE TABLE grade
(
    id         BIGSERIAL PRIMARY KEY,  
    grade_id   INTEGER NOT NULL, 
    name       VARCHAR(55),
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP, 
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Security
GRANT SELECT ON classes TO admin;
GRANT UPDATE ON classes TO admin;
GRANT SELECT ON grade TO admin;
GRANT UPDATE ON grade TO admin;

GRANT SELECT ON classes TO classpool;
GRANT INSERT ON classes TO classpool;
GRANT UPDATE ON classes TO classpool;
GRANT SELECT ON grade TO classpool;
GRANT INSERT ON grade TO classpool;
GRANT UPDATE ON grade TO classpool;
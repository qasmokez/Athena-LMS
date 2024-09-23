-- Setup Tables
\connect studentdb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS student;
CREATE TABLE student (
    student_uuid UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), -- internal id
    classes_id int default 0 not null, -- 班级id
    grade_id   int default 0 not null, -- 年级id
    last_name  varchar(100)  not null, -- 姓
    first_name varchar(100)  not null, -- 名
    birth_date timestamp     null,     -- 生日
    sex        varchar(10)   null,     -- 性别
    ethnic     varchar(100)  not null, -- 民族
    student_id varchar(50)   null,     -- 学号
    active     boolean default true not null,
    enroll_date timestamp    null,     -- 入学时间
    data jsonb
);

DROP TABLE IF EXISTS student_expand;
CREATE TABLE student_expand (
    student_uuid UUID UNIQUE,
    data jsonb,
    CONSTRAINT fk_student FOREIGN KEY (student_uuid) REFERENCES student(student_uuid) ON DELETE CASCADE
);

DROP TABLE IF EXISTS parents;
CREATE TABLE parents (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    student_uuid UUID, -- internal id
    data jsonb
);

DROP TABLE IF EXISTS attendance;
CREATE TABLE attendance (
    student_uuid UUID, -- internal id
    data jsonb
);

DROP TABLE IF EXISTS honors;
CREATE TABLE honors (
    student_uuid UUID, -- internal id
    data jsonb
);

-- Security
GRANT SELECT ON student TO admin;
GRANT UPDATE ON student TO admin;

GRANT SELECT ON honors TO admin;
GRANT UPDATE ON honors TO admin;

GRANT SELECT ON parents TO admin;
GRANT UPDATE ON parents TO admin;

GRANT SELECT ON student_expand TO admin;
GRANT UPDATE ON student_expand TO admin;
GRANT INSERT ON student_expand TO admin;

GRANT SELECT ON student_expand TO studentpool;
GRANT UPDATE ON student_expand TO studentpool;
GRANT INSERT ON student_expand TO studentpool;

GRANT SELECT ON student TO studentpool;
GRANT INSERT ON student TO studentpool;
GRANT UPDATE ON student TO studentpool;

GRANT SELECT ON honors TO studentpool;
GRANT INSERT ON honors TO studentpool;
GRANT UPDATE ON honors TO studentpool;

GRANT SELECT ON parents TO studentpool;
GRANT INSERT ON parents TO studentpool;
GRANT UPDATE ON parents TO studentpool;
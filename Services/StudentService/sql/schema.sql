-- Setup Tables
\connect studentdb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create tables
DROP TABLE IF EXISTS student;
CREATE TABLE student (
    studentid UUID, -- internal id
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
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    family_address varchar(100)  null, -- 家庭地址
    father         varchar(30)   null, -- 父亲
    father_tel     varchar(20)   null, -- 父亲电话号码
    mother         varchar(30)   null, -- 母亲
    mother_tel     varchar(20)   null, -- 母亲电话号码
    photo          varchar(255)  null, -- 照片
    id_number      varchar(18)   null, -- 身份证号
    emergency      varchar(30)   null, -- 紧急联系人
    emergency_tel  varchar(20)   null, -- 紧急联系人号码
    created_at     timestamp     null,
    updated_at     timestamp     null
);

DROP TABLE IF EXISTS parents;
CREATE TABLE parents (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
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

-- Security
GRANT SELECT ON student TO admin;
GRANT UPDATE ON student TO admin;
GRANT SELECT ON honors TO admin;
GRANT UPDATE ON honors TO admin;
GRANT SELECT ON parents TO admin;
GRANT UPDATE ON parents TO admin;
GRANT SELECT ON student TO studentpool;
GRANT INSERT ON student TO studentpool;
GRANT UPDATE ON student TO studentpool;
GRANT SELECT ON honors TO studentpool;
GRANT INSERT ON honors TO studentpool;
GRANT UPDATE ON honors TO studentpool;
GRANT SELECT ON parents TO studentpool;
GRANT INSERT ON parents TO studentpool;
GRANT UPDATE ON parents TO studentpool;


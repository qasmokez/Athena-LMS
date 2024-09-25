-- Create the database
CREATE DATABASE gradedb;

-- Create roles and assign passwords
CREATE ROLE gradepool WITH LOGIN PASSWORD 'gradepassword';

\connect gradedb
CREATE EXTENSION IF NOT EXISTS pgcrypto;
GRANT CONNECT ON DATABASE gradedb TO gradepool;
GRANT CONNECT ON DATABASE gradedb TO admin;


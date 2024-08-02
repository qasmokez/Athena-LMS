-- Create the database
CREATE DATABASE studentdb;

-- Create roles and assign passwords
CREATE ROLE studentpool WITH LOGIN PASSWORD 'studentpassword';

\connect studentdb
CREATE EXTENSION IF NOT EXISTS pgcrypto;
GRANT CONNECT ON DATABASE studentdb TO studentpool;
GRANT CONNECT ON DATABASE studentdb TO admin;


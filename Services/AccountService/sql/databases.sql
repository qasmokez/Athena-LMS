-- Create the account database
CREATE DATABASE accountdb;

-- Create roles and assign passwords
CREATE ROLE admin LOGIN PASSWORD 'adminpassword';
CREATE ROLE accountpool WITH LOGIN PASSWORD 'accountpassword';

\connect accountdb
CREATE EXTENSION IF NOT EXISTS pgcrypto;
GRANT CONNECT ON DATABASE accountdb TO accountpool;
GRANT CONNECT ON DATABASE accountdb TO admin;


-- Create the account database
CREATE DATABASE account;

-- Create roles and assign passwords
CREATE ROLE admin LOGIN PASSWORD 'adminpassword';
CREATE ROLE accountpool WITH LOGIN PASSWORD 'accountpassword';

\connect account
CREATE EXTENSION IF NOT EXISTS pgcrypto;
GRANT CONNECT ON DATABASE account TO accountpool;
GRANT CONNECT ON DATABASE account TO admin;


-- Create the class database
CREATE DATABASE classdb;

-- Create roles and assign passwords
CREATE ROLE classpool WITH LOGIN PASSWORD 'classpassword';

\connect classdb
CREATE EXTENSION IF NOT EXISTS pgcrypto;
GRANT CONNECT ON DATABASE classdb TO classpool;


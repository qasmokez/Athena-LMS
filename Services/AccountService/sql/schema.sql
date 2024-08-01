-- Setup Tables
\connect accountdb

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Create a sequence for generating unique 7-digit IDs
CREATE SEQUENCE student_id_seq
START 1000000
MINVALUE 1000000
MAXVALUE 9999999
INCREMENT 1
CACHE 10;

-- Function to generate a 7-digit student ID
CREATE OR REPLACE FUNCTION generate_student_id()
RETURNS VARCHAR AS $$
DECLARE
    new_id INTEGER;
    formatted_id VARCHAR;
BEGIN
    LOOP
        -- Generate a new ID
        new_id := nextval('student_id_seq');

        -- Convert to 7-digit format
        formatted_id := LPAD(new_id::TEXT, 7, '0');

        -- Check if it falls within the restricted range
        IF formatted_id NOT BETWEEN '0000000' AND '0010000' THEN
            RETURN formatted_id;
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Create account table
DROP TABLE IF EXISTS account CASCADE;
CREATE TABLE account (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    studentid VARCHAR(7) UNIQUE DEFAULT generate_student_id(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data jsonb
);

GRANT SELECT ON account TO admin;
GRANT UPDATE ON account TO admin;
GRANT SELECT ON account TO accountpool;
GRANT INSERT ON account TO accountpool;
GRANT UPDATE ON account TO accountpool;

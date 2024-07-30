-- Setup Tables
\connect account

-- Create account table
DROP TABLE IF EXISTS account;
CREATE TABLE account (
    id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data jsonb
);
GRANT SELECT ON account TO admin;
GRANT UPDATE ON account TO admin;
GRANT SELECT ON account TO accountpool;
GRANT INSERT ON account TO accountpool;
GRANT UPDATE ON account TO accountpool;

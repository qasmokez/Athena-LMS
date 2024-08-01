-- accounts Data --
\connect accountdb

DELETE FROM account;

INSERT INTO account(id, studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '0000001',
    jsonb_build_object(
        'name', 'Jason Zhang',
        'chinese_name', 'none',
        'email', 'jason@mail.com',
        'pwhash', crypt('jasonzhang', gen_salt('bf')),
        'role', '["student"]'
    )
);

INSERT INTO account(id, studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '0000002',
    jsonb_build_object(
        'name', 'Tony Wang',
        'chinese_name', 'none',
        'email', 'tony@mail.com',
        'pwhash', crypt('tonywang', gen_salt('bf')),
        'role', '["student"]'
    )
);


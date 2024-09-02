-- accounts Data --
\connect studentdb

DELETE FROM student;
INSERT INTO student(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'grade', '10',
        'class', '1',
        'gender', 'male',
        'created_at': '2024-09-02',
        'updated_at': '2024-09-02',
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'grade', '12',
        'class', '3',
        'gender', 'female',
        'created_at': '2024-09-02',
        'updated_at': '2024-09-02',
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '33333333-3333-3333-3333-333333333333',
    jsonb_build_object(
        'grade', '11',
        'class', '2',
        'gender', 'female',
        'created_at', '2024-09-02',
        'updated_at', '2024-09-02'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '44444444-4444-4444-4444-444444444444',
    jsonb_build_object(
        'grade', '10',
        'class', '1',
        'gender', 'male',
        'created_at', '2024-09-02',
        'updated_at', '2024-09-02'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '55555555-5555-5555-5555-555555555555',
    jsonb_build_object(
        'grade', '12',
        'class', '3',
        'gender', 'female',
        'created_at', '2024-09-02',
        'updated_at', '2024-09-02'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '66666666-6666-6666-6666-666666666666',
    jsonb_build_object(
        'grade', '11',
        'class', '2',
        'gender', 'male',
        'created_at', '2024-09-02',
        'updated_at', '2024-09-02'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '77777777-7777-7777-7777-777777777777',
    jsonb_build_object(
        'grade', '9',
        'class', '1',
        'gender', 'female',
        'created_at', '2024-09-02',
        'updated_at', '2024-09-02'
    )
);

DELETE FROM honors;
INSERT INTO honors(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Jason Zhang',
        'honor', '1st place',
        'givenby', 'Mr. Smith',
        'givenon', '2020-01-01'
    )
);

INSERT INTO honors(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'name', 'Tony Wang',
        'honor', '2nd place',
        'givenby', 'dr. Johnson',
        'givenon', '2020-01-02'
    )
);

DELETE FROM parents;
INSERT INTO parents(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Bro Zhang',
        'relation', 'father',
        'phone', '123-456-7890',
        'govtID', '110101194501018618'
    )
);
INSERT INTO parents(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Girl Zhang',
        'relation', 'mother',
        'phone', '098-765-4321',
        'govtID', '1101011945091718618'
    )
);
INSERT INTO parents(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'LeBron James',
        'relation', 'other',
        'phone', '999-999-4321',
        'govtID', '110101196801018618'
    )
);
INSERT INTO parents(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'name', 'Dad Wang',
        'relation', 'father',
        'phone', '123-456-6666',
        'govtID', '110101194301018618'
    )
);
INSERT INTO parents(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'name', 'Mom Wang',
        'relation', 'mother',
        'phone', '098-666-4321',
        'govtID', '110101194201018618'
    )
);

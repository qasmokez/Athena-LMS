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
        'dob', '2003-01-01', -- date of birth
        'address', '123 Nosh Mabollocks Ave.',
        'govtID', '110101200301018618'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'grade', '12',
        'class', '3',
        'gender', 'female',
        'dob', '2003-01-02',
        'address', 'no.1 Beijing Street',
        'govtID', '110101200301028618'
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

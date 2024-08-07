-- accounts Data --
\connect studentdb

DELETE FROM student;
INSERT INTO student(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'grade', '10',
        'class', '1',
        'name', 'Jason Zhang',
        'gender', 'male'
    )
);

INSERT INTO student(studentid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'grade', '12',
        'class', '3',
        'name', 'Tony Wang',
        'gender', 'female'
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
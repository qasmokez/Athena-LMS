-- accounts Data --
\connect studentdb

DELETE FROM student;
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '2',
    '5',
    'zhang',
    'jason',
    '09-04-2002',
    'male',
    'han',
    '0000001',
    true,
    '08-12-2021',
    jsonb_build_object(
        'created_at', '08-12-2021',
        'updated_at', '09-04-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    '5',
    '6',
    'wang',
    'tony',
    '01-01-2002',
    'male',
    'han',
    '0000002',
    true,
    '08-12-2021',
    jsonb_build_object(
        'created_at', '08-12-2021',
        'updated_at', '09-04-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '33333333-3333-3333-3333-333333333333',
    '3',
    '11',
    'liu',
    'anna',
    '05-02-2004',
    'female',
    'han',
    '0000003',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '44444444-4444-4444-4444-444444444444',
    '1',
    '10',
    'li',
    'john',
    '09-02-2004',
    'male',
    'han',
    '0000004',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '55555555-5555-5555-5555-555555555555',
    '3',
    '12',
    'chen',
    'lisa',
    '09-02-2003',
    'female',
    'han',
    '0000005',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '66666666-6666-6666-6666-666666666666',
    '2',
    '11',
    'zhao',
    'kevin',
    '09-02-2004',
    'male',
    'han',
    '0000006',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
    )
);
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '77777777-7777-7777-7777-777777777777',
    '1',
    '9',
    'liang',
    'amy',
    '09-02-2005',
    'female',
    'han',
    '0000007',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
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
        'givenby', 'Dr. Johnson',
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

DELETE FROM student_expand;
INSERT INTO student_expand (student_uuid, family_address, father, father_tel, mother, mother_tel, photo, id_number, emergency, emergency_tel, created_at, updated_at)
VALUES (
    '22222222-2222-2222-2222-222222222222', 
    '123 Wang Street, Beijing',
    'Dad Wang', 
    '123-456-6666', 
    'Mom Wang', 
    '098-666-4321', 
    'https://example.com/photos/tony_wang.jpg',
    '110101200201018617', 
    'Dad Wang', 
    '123-456-6666', 
    CURRENT_TIMESTAMP, 
    CURRENT_TIMESTAMP  
);
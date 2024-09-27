-- accounts Data --
\connect studentdb

DELETE FROM student;
INSERT INTO student(student_uuid, classes_id, grade_id, last_name, first_name, birth_date, sex, ethnic, student_id, active, enroll_date, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    '2',
    '5',
    '张',
    '杰森',
    '09-04-2002',
    '男',
    '汉族',
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
    '王',
    '托尼',
    '01-01-2002',
    '男',
    '汉族',
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
    '王',
    '安娜',
    '05-02-2004',
    '女',
    '汉族',
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
    '李',
    '约翰',
    '09-02-2004',
    '男',
    '汉族',
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
    '陈',
    '丽萨',
    '09-02-2003',
    '女',
    '蒙古族',
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
    '赵',
    '凯文',
    '09-02-2004',
    '男',
    '汉族',
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
    '梁',
    '艾米',
    '09-02-2005',
    '女',
    '维吾尔族',
    '0000007',
    true,
    '09-02-2024',
    jsonb_build_object(
        'created_at', '09-02-2024',
        'updated_at', '09-02-2024'
    )
);

DELETE FROM honors;
INSERT INTO honors(student_uuid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Jason Zhang',
        'honor', '1st place',
        'givenby', 'Mr. Smith',
        'givenon', '2020-01-01'
    )
);
INSERT INTO honors(student_uuid, data)
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
INSERT INTO parents(student_uuid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Bro Zhang',
        'relation', 'father',
        'phone', '123-456-7890',
        'govtID', '110101194501018618'
    )
);
INSERT INTO parents(student_uuid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'Girl Zhang',
        'relation', 'mother',
        'phone', '098-765-4321',
        'govtID', '1101011945091718618'
    )
);
INSERT INTO parents(student_uuid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'name', 'LeBron James',
        'relation', 'other',
        'phone', '999-999-4321',
        'govtID', '110101196801018618'
    )
);
INSERT INTO parents(student_uuid, data)
VALUES (
    '22222222-2222-2222-2222-222222222222',
    jsonb_build_object(
        'name', 'Dad Wang',
        'relation', 'father',
        'phone', '123-456-6666',
        'govtID', '110101194301018618'
    )
);
INSERT INTO parents(student_uuid, data)
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
-- INSERT INTO student_expand (student_uuid, family_address, father, father_tel, mother, mother_tel, photo, id_number, emergency, emergency_tel, created_at, updated_at)
-- VALUES (
--     '22222222-2222-2222-2222-222222222222', 
--     '123 Wang Street, Beijing',
--     'Dad Wang', 
--     '123-456-6666', 
--     'Mom Wang', 
--     '098-666-4321', 
--     'https://example.com/photos/tony_wang.jpg',
--     '110101200201018617', 
--     'Dad Wang', 
--     '123-456-6666', 
--     CURRENT_TIMESTAMP, 
--     CURRENT_TIMESTAMP  
-- );

DELETE FROM nation;
INSERT INTO nation (name) VALUES ('汉族'), ('壮族'), ('满族'), ('回族'), ('苗族'), ('维吾尔族'), 
('土家族'), ('彝族'), ('蒙古族'), ('藏族'), ('布依族'), ('侗族'), ('瑶族'), ('朝鲜族'), 
('白族'), ('哈尼族'), ('哈萨克族'), ('黎族'), ('傣族'), ('畲族'), ('傈僳族'), ('仡佬族'), 
('东乡族'), ('高山族'), ('拉祜族'), ('水族'), ('佤族'), ('纳西族'), ('羌族'), ('土族'), 
('仫佬族'), ('锡伯族'), ('柯尔克孜族'), ('达斡尔族'), ('景颇族'), ('毛南族'), ('撒拉族'), 
('布朗族'), ('塔吉克族'), ('阿昌族'), ('普米族'), ('鄂温克族'), ('怒族'), ('京族'), 
('基诺族'), ('德昂族'), ('保安族'), ('俄罗斯族'), ('裕固族'), ('乌孜别克族'), ('门巴族'), 
('鄂伦春族'), ('独龙族'), ('塔塔尔族'), ('赫哲族'), ('珞巴族');
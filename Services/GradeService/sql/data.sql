-- grade Data --
\connect gradedb

DELETE FROM grade;
INSERT INTO grade(student_uuid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'testField1', 'heh',
        'testField2', 'heh2'
    )
);

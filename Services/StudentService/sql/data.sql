-- accounts Data --
\connect studentdb

DELETE FROM student;
INSERT INTO student(studentid, data)
VALUES (
    '11111111-1111-1111-1111-111111111111',
    jsonb_build_object(
        'grade', '10',
        'class', '1'
    )
)
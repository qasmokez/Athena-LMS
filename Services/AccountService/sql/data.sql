-- accounts Data --
DELETE FROM "account";

INSERT INTO "account"(data)
VALUES (
    '{
        "name": "Jason Zhang",
        "chinese_name": "",
        "email": "jason@mail.com",
        "pwhash": crypt('jasonzhang','tudou')
    }'
);

INSERT INTO "account"(data)
VALUES (
    '{
        "name": "Tony",
        "chinese_name": "",
        "email": "tony@mail.com",
        "pwhash": crypt('tony','tudou')
    }'
);


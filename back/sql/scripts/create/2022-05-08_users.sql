DROP TABLE users;
CREATE TABLE users (
    sub text PRIMARY KEY,
    id integer,
    name text NOT NULL,
    nickname text,
    email text,
    picture text,
    admin boolean
);
CREATE SEQUENCE users_id_seq;
ALTER TABLE users ALTER COLUMN id SET DEFAULT nextval('users_id_seq');
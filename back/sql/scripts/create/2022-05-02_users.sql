CREATE TABLE users (
    id serial PRIMARY KEY,
    name text NOT NULL,
    email text,
    designation text,
    phone integer
);
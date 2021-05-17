DROP IF TABLE EXISTS Login;

CREATE TABLE Login(
    id SERIAL PRIMARY KEY,
    username TEXT NOT NULL,
    password TEXT NOT NULL,
    mast BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO Login (username, password) VALUES ('abc', '123');
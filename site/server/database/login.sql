DROP IF TABLE EXISTS Login;

CREATE TABLE Login(
    id SERIAL PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    mast BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO Login (email, name, password) VALUES ('abc', 'Jakob', '$2a$10$bPz8W2IpvrcA8ux4.CAf.ergphFk8lQvVk3M1zpHT0PjXo3JfB.vC');


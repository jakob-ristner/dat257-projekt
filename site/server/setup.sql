DROP TABLE IF EXISTS Example;
CREATE TABLE Example (
    id CHAR(6) PRIMARY KEY,
    dateOfBirth DATE NOT NULL DEFAULT NOW()
);

INSERT INTO Example (id) VALUES ('111111');
INSERT INTO Example (id, dateOfBirth) VALUES ('222222', '2020-05-02');
INSERT INTO Example (id, dateOfBirth) VALUES ('333333', '1999-07-01');
INSERT INTO Example (id, dateOfBirth) VALUES ('444444', '2001-03-26');
INSERT INTO Example (id, dateOfBirth) VALUES ('555555', '1995-01-01');


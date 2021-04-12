\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

CREATE TABLE registration (
    --Ask PO how many protocols will be created in a year
    --Or how the id-number should be checked. 
    protocolID INT PRIMARY KEY,
    regDate DATE NOT NULL,
    reason TEXT
);
DROP TABLE IF EXISTS Hembesok;

CREATE TABLE Hembesok (
    idnr SERIAL PRIMARY KEY,
    protokollnr TEXT NOT NULL,

    date_added DATE NOT NULL DEFAULT NOW(),
    at_family TIMESTAMP,
    from_family TIMESTAMP,
    performed_by TEXT,

    amning_nutrition BOOLEAN NOT NULL DEFAULT FALSE,
    stodsamtal BOOLEAN NOT NULL DEFAULT FALSE,
    viktkontroll BOOLEAN NOT NULL DEFAULT FALSE,
    provtagning BOOLEAN NOT NULL DEFAULT FALSE,
    lakemedel BOOLEAN NOT NULL DEFAULT FALSE,
    annan_at TEXT NOT NULL DEFAULT '',
    lakare BOOLEAN NOT NULL DEFAULT FALSE,
    logoped BOOLEAN NOT NULL DEFAULT FALSE,
    dietist BOOLEAN NOT NULL DEFAULT FALSE,
    annan_resurs TEXT NOT NULL DEFAULT '',

    av_logistik BOOLEAN NOT NULL DEFAULT FALSE,
    av_barn_familj BOOLEAN NOT NULL DEFAULT FALSE,
    av_personal BOOLEAN NOT NULL DEFAULT FALSE,
    av_beskrivning TEXT NOT NULL DEFAULT ''
);

-- Test inserts

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-04-12 15:00', '2021-04-12 16:00', 'John');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-04-11 15:00', '2021-04-11 16:00', 'John');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-04-12 13:00', '2021-04-12 16:00', 'Mary');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'Jane');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'Jane');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'Jane');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'Jane');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'John');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'Anton');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by)
    VALUES ('222', '2021-03-12 15:00', '2021-03-12 16:00', 'A');

INSERT INTO Hembesok (protokollnr, at_family, from_family, performed_by, stodsamtal,
                        lakare, av_logistik, av_beskrivning)
    VALUES ('111', '2021-03-12 15:00', '2021-03-12 16:00', 'John', true, true, 
            true, 'blev sen');

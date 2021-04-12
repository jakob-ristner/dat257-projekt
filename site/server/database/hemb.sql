DROP TABLE IF EXISTS Hembesok;

CREATE TABLE Hembesok (
    id SERIAL PRIMARY KEY,

    date_added DATE NOT NULL DEFAULT NOW(),
    at_family TIMESTAMP NOT NULL,
    from_family TIMESTAMP NOT NULL,
    performed_by TEXT NOT NULL,

    amining_nutrition BOOLEAN NOT NULL DEFAULT FALSE,
    stodsamtal BOOLEAN NOT NULL DEFAULT FALSE,
    viktkontroll BOOLEAN NOT NULL DEFAULT FALSE,
    provtagning BOOLEAN NOT NULL DEFAULT FALSE,
    lakemedel BOOLEAN NOT NULL DEFAULT FALSE,
    annan_åt TEXT NOT NULL DEFAULT '',
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

INSERT INTO Hembesok (at_family, from_family, performed_by)
    VALUES ('2021-04-12 15:00', '2021-04-12 16:00', 'John');

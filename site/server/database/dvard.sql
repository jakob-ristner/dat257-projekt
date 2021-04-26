DROP TABLE IF EXISTS Dvard;

CREATE TABLE Dvard (
    id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    date_start_time TIMESTAMP NOT NULL, -- Start date and start time
    end_time TIME NOT NULL, 
    performed_by TEXT NOT NULL,

    amning_nutrition BOOLEAN NOT NULL DEFAULT FALSE,
    stodsamtal BOOLEAN NOT NULL DEFAULT FALSE,
    viktkontroll BOOLEAN NOT NULL DEFAULT FALSE,
    annat_mote TEXT NOT NULL DEFAULT '',

    lakare BOOLEAN NOT NULL DEFAULT FALSE,
    logoped BOOLEAN NOT NULL DEFAULT FALSE,
    dietist BOOLEAN NOT NULL DEFAULT FALSE,
    kurator BOOLEAN NOT NULL DEFAULT FALSE,
    annan_resurs TEXT NOT NULL DEFAULT '',

    avvikelse TEXT NOT NULL DEFAULT ''
);

-- Test values
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-02-26 17:00', '18:00', 'Hugo');

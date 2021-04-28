DROP TABLE IF EXISTS Dvard;

CREATE TABLE Dvard (
    id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    date_start_time TIMESTAMP NOT NULL, -- Start date and start time
    end_time TIME NOT NULL, 
    performed_by TEXT NOT NULL,

    amning_nutrition BOOLEAN NOT NULL DEFAULT false,
    stodsamtal BOOLEAN NOT NULL DEFAULT false,
    viktkontroll BOOLEAN NOT NULL DEFAULT false,
    annat_mote TEXT NOT NULL DEFAULT '',

    lakare BOOLEAN NOT NULL DEFAULT false,
    logoped BOOLEAN NOT NULL DEFAULT false,
    dietist BOOLEAN NOT NULL DEFAULT false,
    kurator BOOLEAN NOT NULL DEFAULT false,
    annan_resurs TEXT NOT NULL DEFAULT '',

    avvikelse TEXT NOT NULL DEFAULT ''
);

-- Test values
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-02-26 17:00', '12:00', 'Hugo');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-04-26 12:00', '13:10', 'Hans');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2020-02-27 00:30', '11:05', 'Olle');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-03-26 17:00', '12:00', 'Hugo');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-08-26 13:37', '23:59', 'Karl');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2020-09-27 00:30', '11:05', 'Olof');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('112', '2021-03-02 15:00', '16:01', 'Åsa');
INSERT INTO Dvard (protocolID, date_start_time, end_time, performed_by)
    VALUES ('112', '2021-01-01 17:25', '18:00', 'Erik');

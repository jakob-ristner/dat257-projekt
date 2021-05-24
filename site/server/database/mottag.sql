DROP TABLE IF EXISTS Mottag;

CREATE TABLE Mottag(
    id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    date_start_time TIMESTAMP NOT NULL, -- Start date and start time
    end_time TIME NOT NULL, 
    performed_by TEXT NOT NULL,

    amning_nutrition BOOLEAN NOT NULL DEFAULT false,
    stodsamtal BOOLEAN NOT NULL DEFAULT false,
    viktkontroll BOOLEAN NOT NULL DEFAULT false,
    provtagning BOOLEAN NOT NULL DEFAULT false,
    lakemedel BOOLEAN NOT NULL DEFAULT false,
    annat_mote TEXT NOT NULL DEFAULT '',

    lakare BOOLEAN NOT NULL DEFAULT false,
    logoped BOOLEAN NOT NULL DEFAULT false,
    dietist BOOLEAN NOT NULL DEFAULT false,
    kurator BOOLEAN NOT NULL DEFAULT false,
    annan_resurs TEXT NOT NULL DEFAULT '',

    av_logistik BOOLEAN NOT NULL DEFAULT FALSE,
    av_barn_familj BOOLEAN NOT NULL DEFAULT FALSE,
    av_personal BOOLEAN NOT NULL DEFAULT FALSE,
    av_beskrivning TEXT NOT NULL DEFAULT '',

    UNIQUE(protocolID, date_start_time)
);


--Test values
INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-01-01 16:00', '18:00', 'Henrik');

INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-01-01 17:00', '18:00', 'Johanna');

INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-01-01 15:00', '18:00', 'Frida');


INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-01-01 13:00', '18:00', 'Erik');


INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by)
    VALUES ('111', '2021-01-04 19:00', '18:00', 'Lisa');


INSERT INTO Mottag (protocolID, date_start_time, end_time, performed_by, amning_nutrition)
    VALUES ('111', '2020-02-23 11:00', '18:00', 'Johan', 'true');


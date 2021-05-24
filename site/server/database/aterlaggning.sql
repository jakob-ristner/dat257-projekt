DROP TABLE IF EXISTS Aterlaggning;

CREATE TABLE Aterlaggning (
     id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    
    aterlaggning_startdate DATE NOT NULL, -- Start date and start time
    aterlaggning_enddate DATE NOT NULL DEFAULT CURRENT_DATE, -- End date and start time
    utskrivning_hemmet BOOLEAN DEFAULT FALSE NOT NULL,
    orsak TEXT NOT NULL DEFAULT '',

    UNIQUE(protocolID, aterlaggning_startdate)
);


INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, aterlaggning_enddate, utskrivning_hemmet, orsak)
    VALUES ('111', '2021-05-20', '2022-06-02', TRUE, 'person mycket sjuk');

INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate)
    VALUES ('111', '2021-05-27');

    






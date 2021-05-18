DROP TABLE IF EXISTS Aterlaggning;

CREATE TABLE Aterlaggning (
     id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    
    aterlaggning_startdate DATE NOT NULL, -- Start date and start time
    orsak TEXT NOT NULL DEFAULT ''
);


/* CREATE TABLE endAterlaggning (
     id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (id) REFERENCES addAterlaggning(id),
    
    aterlaggning_enddate DATE NOT NULL, -- Start date and start time
    utskrivning_hemmet BOOLEAN DEFAULT FALSE NOT NULL
);*/



--Test values
INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, orsak)
    VALUES ('111', '2021-03-01', 'hafkjk');

INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, orsak)
    VALUES ('111', '2021-04-01', 'test1');

INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, orsak)
    VALUES ('222', '2021-05-01', 'test2');

/*
INSERT INTO endAterlaggning (protocolID, aterlaggning_enddate, utskrivning_hemmet)
    VALUES ('111', '2021-03-05', true);

*/


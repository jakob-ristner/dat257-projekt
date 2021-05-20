DROP TABLE IF EXISTS Aterlaggning;

CREATE TABLE Aterlaggning (
     id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    
    aterlaggning_startdate DATE NOT NULL, -- Start date and start time
    aterlaggning_enddate DATE NOT NULL DEFAULT NOW(), -- End date and start time
    utskrivning_hemmet BOOLEAN DEFAULT FALSE NOT NULL,
    orsak TEXT NOT NULL DEFAULT '',

    UNIQUE(protocolID, aterlaggning_startdate)
);





--Test values
INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, aterlaggning_enddate, utskrivning_hemmet, orsak)
    VALUES ('111', '2021-03-01', '2021-03-05', true, 'hafkjk');

INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, aterlaggning_enddate, utskrivning_hemmet, orsak)
    VALUES ('111', '2021-04-01', '2021-05-05', false,  'test1');

INSERT INTO Aterlaggning (protocolID, aterlaggning_startdate, utskrivning_hemmet, orsak)
    VALUES ('222', '2021-05-01', true, 'test2');






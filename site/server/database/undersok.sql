DROP TABLE IF EXISTS Undersok;

CREATE TABLE Undersok(
     id SERIAL PRIMARY KEY,
    protocolID INT NOT NULL,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    undersok_date DATE NOT NULL, -- Start date and start time

    ultraljud_hjarta BOOLEAN NOT NULL DEFAULT false,
    lakarbesok BOOLEAN NOT NULL DEFAULT false,
    ogonundersokning BOOLEAN NOT NULL DEFAULT false,
    ortopedkonsult BOOLEAN NOT NULL DEFAULT false,
    oronundersokning BOOLEAN NOT NULL DEFAULT false,
    annat TEXT NOT NULL DEFAULT ''
);

--Test values
INSERT INTO Undersok (protocolID, undersok_date, ultraljud_hjarta, annat)
    VALUES (g'111', '2021-01-01', true, 'ccc');

INSERT INTO Undersok (protocolID, undersok_date, ultraljud_hjarta, annat)
    VALUES ('222', '2021-01-01', false, 'megakoll');

INSERT INTO Undersok (protocolID, undersok_date, lakarbesok, annat)
    VALUES ('112', '2021-01-01', true, 'snabbtitt');

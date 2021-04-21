\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

CREATE TABLE Registration (
    --Ask PO how many protocols will be created in a year
    --Or how the id-number should be checked. 
    protocolID INT PRIMARY KEY,
    regDate DATE NOT NULL,
    reason TEXT,

    --Bakgrundsdata
    veckor INT CHECK (veckor < 53 AND veckor > 0) NOT NULL,
    dagar INT CHECK (dagar < 8 AND dagar >= 0) NOT NULL,
    vikt_fodelse INT CHECK (vikt_fodelse > 0) NOT NULL,
    langd_fodelse FLOAT CHECK (langd_fodelse > 0) NOT NULL,
    huvudomfang_fodelse FLOAT CHECK (huvudomfang_fodelse > 0) NOT NULL,

    --Inskrivning till Neo-HSV
    vikt_inskrivning INT CHECK (vikt_inskrivning >= 0) DEFAULT 0,
    langd_inskrivning FLOAT CHECK (langd_inskrivning >= 0) DEFAULT 0,
    huvudomfang_in FLOAT CHECK (huvudomfang_in >= 0) DEFAULT 0,
    mamma_vill_amma BOOLEAN DEFAULT FALSE,
    amning_inskrivning CHAR(2) CHECK (amning_inskrivning IN ('H', 'D', 'IA')),
    erhaller_bmjolk_in CHAR(2) CHECK (erhaller_bmjolk_in IN ('H', 'D', 'IA')), 
    v_sond_in BOOLEAN DEFAULT FALSE,
    infart_in TEXT,
    andningsstod_in TEXT,
    extraGas_in BOOLEAN DEFAULT FALSE,

    --Utskrivning till Neo-HSV

    --Riskpatient
    riskpatient BOOLEAN DEFAULT FALSE,
    bvcRapportering BOOLEAN DEFAULT TRUE,
    bvcText TEXT    
);

--utskrivning table
CREATE TABLE Discharge (
    protocolID INT PRIMARY KEY,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    outDate DATE NOT NULL,
    vikt_utskrivning INT CHECK (vikt_utskrivning >= 0),
    langd_utskrivning FLOAT CHECK (langd_utskrivning >= 0),
    huvudomfang_ut FLOAT CHECK (huvudomfang_ut >= 0),
    mamma_vill_amma_ut BOOLEAN,
    amning_utskrivning CHAR(2) CHECK (amning_utskrivning IN ('H', 'D', 'IA')),
    erhaller_bmjolk_ut CHAR(2) CHECK (erhaller_bmjolk_ut IN ('H', 'D', 'IA')), 
    v_sond_ut BOOLEAN,
    infart_ut TEXT,
    andningsstod_ut TEXT,
    extraGas_ut BOOLEAN
);

--test values
INSERT INTO registration (protocolID, regDate, reason, veckor, dagar, 
    vikt_fodelse, langd_fodelse, huvudomfang_fodelse) 
    VALUES ('111', '2021-01-01', 'oneoneone', '1', '1', '3500', '83.2', '11.2');

INSERT INTO registration (protocolID, regDate, reason, veckor, dagar, 
    vikt_fodelse, langd_fodelse, huvudomfang_fodelse, amning_inskrivning) 
    VALUES ('112', '2021-01-01', 'oneonetwo', '1', '1', '3500', '83.2', '11.2', 'H');

INSERT INTO Discharge VALUES ('111', '2021-02-04', 1200, 120, 120, TRUE , 'H', 'H',
TRUE, 'yy','yy',TRUE);


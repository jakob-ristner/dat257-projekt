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
    reason TEXT NOT NULL,

    --Bakgrundsdata
    veckor INT CHECK (veckor < 53 AND veckor > 0) NOT NULL,
    dagar INT CHECK (dagar < 8 AND dagar >= 0) NOT NULL,
    vikt_fodelse INT CHECK (vikt_fodelse > 0) NOT NULL,
    langd_fodelse FLOAT CHECK (langd_fodelse > 0) NOT NULL,
    huvudomfang_fodelse FLOAT CHECK (huvudomfang_fodelse > 0) NOT NULL,

    --Inskrivning till Neo-HSV
    vikt_inskrivning INT CHECK (vikt_inskrivning >= 0) DEFAULT 0 NOT NULL,
    langd_inskrivning FLOAT CHECK (langd_inskrivning >= 0) DEFAULT 0 NOT NULL,
    huvudomfang_in FLOAT CHECK (huvudomfang_in >= 0) DEFAULT 0 NOT NULL,
    mamma_vill_amma BOOLEAN DEFAULT FALSE NOT NULL,
    amning_inskrivning VARCHAR(2) CHECK (amning_inskrivning IN ('H', 'D', 'IA')) NOT NULL,
    erhaller_bmjolk_in VARCHAR(2) CHECK (erhaller_bmjolk_in IN ('H', 'D', 'IA')) NOT NULL, 
    v_sond_in BOOLEAN DEFAULT FALSE NOT NULL,
    infart_in TEXT NOT NULL,
    andningsstod_in TEXT NOT NULL,
    extraGas_in BOOLEAN DEFAULT FALSE NOT NULL,

    --Riskpatient
    riskpatient BOOLEAN DEFAULT FALSE NOT NULL,
    bvcRapportering BOOLEAN DEFAULT TRUE NOT NULL,
    bvcText TEXT NOT NULL   
);

--utskrivning table
CREATE TABLE Discharge (
    protocolID INT PRIMARY KEY,
    FOREIGN KEY (protocolID) REFERENCES Registration(protocolID),
    outDate DATE NOT NULL,
    vikt_utskrivning INT CHECK (vikt_utskrivning >= 0) NOT NULL,
    langd_utskrivning FLOAT CHECK (langd_utskrivning >= 0) NOT NULL,
    huvudomfang_ut FLOAT CHECK (huvudomfang_ut >= 0) NOT NULL,
    mamma_vill_amma_ut BOOLEAN NOT NULL,
    amning_utskrivning VARCHAR(2) CHECK (amning_utskrivning IN ('H', 'D', 'IA')) NOT NULL,
    erhaller_bmjolk_ut VARCHAR(2) CHECK (erhaller_bmjolk_ut IN ('H', 'D', 'IA')) NOT NULL, 
    v_sond_ut BOOLEAN NOT NULL,
    infart_ut TEXT NOT NULL,
    andningsstod_ut TEXT NOT NULL,
    extraGas_ut BOOLEAN NOT NULL
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


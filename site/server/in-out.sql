\set QUIET true
SET client_min_messages TO WARNING; -- Less talk please.
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
\set QUIET false

CREATE TABLE registration (
    --Ask PO how many protocols will be created in a year
    --Or how the id-number should be checked. 
    protocolID INT PRIMARY KEY,
    regDate DATE NOT NULL,
    outDate DATE,
    reason TEXT,
    iFyllnadKollad BOOLEAN NOT NULL DEFAULT FALSE,
    registrerad BOOLEAN NOT NULL DEFAULT FALSE,

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

--test values
INSERT INTO registration (protocolID, regDate, reason, veckor, dagar, 
    vikt_fodelse, langd_fodelse, huvudomfang_fodelse) 
    VALUES ('111', '2021-01-01', 'oneoneone', '1', '1', '3500', '83.2', '11.2');

INSERT INTO registration (protocolID, regDate, reason, veckor, dagar, 
    vikt_fodelse, langd_fodelse, huvudomfang_fodelse, amning_inskrivning) 
    VALUES ('112', '2021-01-01', 'oneonetwo', '1', '1', '3500', '83.2', '11.2', 'H');


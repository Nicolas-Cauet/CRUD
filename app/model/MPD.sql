BEGIN;

DROP TABLE IF EXISTS "shortlink";

CREATE TABLE IF NOT EXISTS "shortlink"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "suffix" VARCHAR(50) NOT NULL,
    "target"  VARCHAR(500) NOT NULL,
    "password" CHAR(20) NOT NULL
);

COMMIT;
CREATE TABLE accountDragon(
  "accountId" INTEGER REFERENCES account("id") ON DELETE CASCADE,
  "dragonId" INTEGER REFERENCES dragon("id") ON DELETE CASCADE,
  PRIMARY KEY("accountId", "dragonId")
);
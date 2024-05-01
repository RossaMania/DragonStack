CREATE TABLE account (
  id      SERIAL PRIMARY KEY,
  "usernameHash" VARCHAR(64),
  "passwordHash" VARCHAR(64),
  "sessionId" NVARCHAR(36),
);

CREATE TABLE account (
  id      SERIAL PRIMARY KEY,
  "usernameHash" VARCHAR(64),
  "passwordHash" VARCHAR(64),
  "sessionId" VARCHAR(36),
  balance INTEGER NOT NULL,
);


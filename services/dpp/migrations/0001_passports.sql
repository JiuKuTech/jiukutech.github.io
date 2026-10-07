PRAGMA foreign_keys=ON;
CREATE TABLE daily_sequences (day TEXT PRIMARY KEY, last_value INTEGER NOT NULL CHECK(last_value BETWEEN 1 AND 99999));
CREATE TABLE batches (id TEXT PRIMARY KEY, request_hash TEXT NOT NULL, created_at TEXT NOT NULL, actor TEXT NOT NULL);
CREATE TABLE passports (
 sn TEXT PRIMARY KEY, batch_id TEXT NOT NULL REFERENCES batches(id),
 draft_json TEXT NOT NULL CHECK(json_valid(draft_json)),
 published_json TEXT CHECK(published_json IS NULL OR json_valid(published_json)),
 version INTEGER NOT NULL DEFAULT 1, published_version INTEGER,
 created_at TEXT NOT NULL, updated_at TEXT NOT NULL, published_at TEXT
);
CREATE INDEX passports_batch ON passports(batch_id);
CREATE INDEX passports_updated ON passports(updated_at);
CREATE TABLE revisions (
 id INTEGER PRIMARY KEY AUTOINCREMENT, sn TEXT NOT NULL REFERENCES passports(sn),
 version INTEGER NOT NULL, action TEXT NOT NULL, document_json TEXT NOT NULL,
 actor TEXT NOT NULL, created_at TEXT NOT NULL
);
CREATE TABLE files (
 id TEXT PRIMARY KEY, sn TEXT NOT NULL REFERENCES passports(sn), object_key TEXT NOT NULL UNIQUE,
 filename TEXT NOT NULL, mime TEXT NOT NULL, size INTEGER NOT NULL,
 sha256 TEXT NOT NULL, kind TEXT NOT NULL, created_at TEXT NOT NULL, actor TEXT NOT NULL
);
CREATE INDEX files_sn ON files(sn);
CREATE TRIGGER immutable_serial BEFORE UPDATE OF sn ON passports BEGIN SELECT RAISE(ABORT, 'Serial numbers are immutable'); END;
CREATE TRIGGER no_passport_delete BEFORE DELETE ON passports BEGIN SELECT RAISE(ABORT, 'Keep permanent passport identifiers'); END;

-- Bluebird Learning Center — SQLite schema (applied on every backend boot; idempotent)
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS programs (
  id       TEXT PRIMARY KEY,
  code     TEXT NOT NULL,
  name     TEXT NOT NULL,
  bg       TEXT NOT NULL DEFAULT '#DDEFFC',   -- card tint from the design palette
  short    TEXT NOT NULL DEFAULT '',
  long     TEXT NOT NULL DEFAULT '',
  audience TEXT NOT NULL DEFAULT '',          -- "Intended for" (empty = to be confirmed)
  sort     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS courses (
  id           TEXT PRIMARY KEY,
  program_id   TEXT NOT NULL REFERENCES programs(id),
  name         TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  long         TEXT NOT NULL DEFAULT '',
  schedule     TEXT NOT NULL DEFAULT '',      -- empty = "to be announced"
  level        TEXT NOT NULL DEFAULT '',
  requirements TEXT NOT NULL DEFAULT '',
  published    INTEGER NOT NULL DEFAULT 1,
  sort         INTEGER NOT NULL DEFAULT 0,
  created_at   TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS teachers (
  id   TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  bio  TEXT NOT NULL DEFAULT '',
  sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS teacher_courses (
  teacher_id TEXT NOT NULL REFERENCES teachers(id) ON DELETE CASCADE,
  course_id  TEXT NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  PRIMARY KEY (teacher_id, course_id)
);

CREATE TABLE IF NOT EXISTS themes (               -- "Why families choose Bluebird"
  n     TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body  TEXT NOT NULL,
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faq_categories (
  key   TEXT PRIMARY KEY,
  label TEXT NOT NULL,
  sort  INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS faqs (
  id       TEXT PRIMARY KEY,
  category TEXT NOT NULL REFERENCES faq_categories(key),
  question TEXT NOT NULL,
  answer   TEXT NOT NULL,
  pending  INTEGER NOT NULL DEFAULT 0,        -- answer still to be supplied by the center
  sort     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS hero_slides (
  id   INTEGER PRIMARY KEY AUTOINCREMENT,
  src  TEXT NOT NULL, alt TEXT NOT NULL, pos TEXT NOT NULL DEFAULT 'center', sort INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS registrations (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  ref           TEXT NOT NULL UNIQUE,
  student_name  TEXT NOT NULL,
  is_student    INTEGER NOT NULL DEFAULT 0,   -- submitted by the student themself
  guardian_name TEXT NOT NULL DEFAULT '',
  email         TEXT NOT NULL,
  phone         TEXT NOT NULL DEFAULT '',
  course_id     TEXT NOT NULL,                -- a course id or 'unsure'
  course_name   TEXT NOT NULL,                -- snapshot, survives course edits
  message       TEXT NOT NULL DEFAULT '',
  status        TEXT NOT NULL DEFAULT 'New',
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS inquiries (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  ref        TEXT NOT NULL UNIQUE,
  name       TEXT NOT NULL,
  email      TEXT NOT NULL,
  topic      TEXT NOT NULL DEFAULT 'general',
  message    TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'New',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_courses_program ON courses(program_id, sort);
CREATE INDEX IF NOT EXISTS idx_reg_created ON registrations(created_at);
CREATE INDEX IF NOT EXISTS idx_inq_created ON inquiries(created_at);

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./notes.db', (err) => {
  if (err) console.error(err.message);
  console.log('Connected to SQLite database');
});

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    user_id INTEGER
  )
`);

db.run(`
  ALTER TABLE notes ADD COLUMN user_id INTEGER
`, (err) => {
  if (err) {
    console.log("user_id column already exists (safe to ignore)");
  } else {
    console.log("user_id column added");
  }
});

module.exports = db;
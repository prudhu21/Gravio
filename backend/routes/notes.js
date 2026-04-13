const express = require('express');
const router = express.Router();
const db = require('../db');
const auth = require('../middleware/auth');

router.get('/', auth, (req, res) => {
  db.all(
    "SELECT * FROM notes WHERE user_id=?",
    [req.user.id],
    (err, rows) => {
      res.json(rows);
    }
  );
});

router.post('/', auth, (req, res) => {
  const { title, content } = req.body;

  db.run(
    "INSERT INTO notes (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, req.user.id],
    function (err) {
      res.json({ id: this.lastID });
    }
  );
});

router.put('/:id', auth, (req, res) => {
  const { title, content } = req.body;
  db.run(
    "UPDATE notes SET title=?, content=? WHERE id=? AND user_id=?",
    [title, content, req.params.id, req.user.id],
    function (err) {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

router.delete('/:id', auth, (req, res) => {
  db.run("DELETE FROM notes WHERE id=? AND user_id=?", [req.params.id, req.user.id], function (err) {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

module.exports = router;
const express = require("express");
const db = require("../db");

const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const results = await User.findAll();
    res.status(200).json(results);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const results = await User.findOne(id);
    res.status(200).json(results[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  const { pseudo } = req.body;
  db.query("INSERT INTO users (pseudo) VALUES (?)", [pseudo])
    .then((results) => {
      return db.query("SELECT * FROM users WHERE id=?", [results.insertId]);
    })
    .then((results) => {
      res.status(201).json(results[0]);
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.put("/:id", (req, res) => {
  const { pseudo } = req.body;
  const { id } = req.params;
  db.query("UPDATE users SET pseudo=? WHERE id=?", [pseudo, id])
    .then((results) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE id=?", [id])
    .then((results) => {
      res.status(204).end();
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
});

module.exports = router;

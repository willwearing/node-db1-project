const express = require("express");

// database access using knex
const db = require("./data/dbConfig");

const router = express.Router();

//db helper start
const Accounts = {
  getAll() {
    return db("accounts");
  },
  getById(id) {
    return db("accounts").where({ id }).first();
  },
  create(post) {
    return db("accounts").insert(post);
  },
  update(id, post) {
    return db("accounts").where({ id }).update(post);
  },
  delete(id) {
    return db("accounts").where({ id }).del();
  },
};
//db helper end

router.get("/", (req, res) => {
  Accounts.getAll()
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.get("/:id", (req, res) => {
  Accounts.getById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.post("/", (req, res) => {
  Accounts.create(req.body)
    .then(([id]) => {
      return Accounts.getById(id).first();
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.json({ error: error.message });
    });
});

router.put("/:id", async (req, res) => {
  try {
    await Accounts.update(req.params.id, req.body);
    const updatedPost = await Accounts.getById(req.params.id).first();
    res.json(updatedPost);
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.delete("/:id", (req, res) => {
  Accounts.delete(req.params.id)
    .then((data) => {
      res.json({ message: `successfully deleted ${req.params.id}` });
    })
    .catch((err) => {
      res.json({ error: err.message });
    });
});

module.exports = router;

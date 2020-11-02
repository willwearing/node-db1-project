const express = require("express");
const accountRouter = require("../accountRouter");
const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.use("/api/accounts", accountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "server running" });
});

module.exports = server;

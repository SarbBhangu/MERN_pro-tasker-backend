const express = require("express");
const cors = require("cors");

const app = express(); //creates the app

app.use(cors()); // allows the frontend to talk to the backend
app.use(express.json()); // lets the server understand JSON

app.get("/", (req, res) => {
  res.send("API is running"); //message so we know the server works
});

module.exports = app;

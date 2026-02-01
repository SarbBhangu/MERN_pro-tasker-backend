const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const cors = require("cors");



const app = express(); //creates the app

app.use(cors()); // allows the frontend to talk to the backend
app.use(express.json()); // lets the server understand JSON
// Auth routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);


app.get("/", (req, res) => {
  res.send("API is running"); //message so we know the server works
});

module.exports = app;

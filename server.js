"use strict";

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlController = require("./controllers/urlController.js");
require("dotenv").config();

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
mongoose.connect(process.env.MONGODB_URI, {
  dbName: "fcc-url-shortener-microservice",
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", () => {
  console.log("DB connection successful");
});

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here
app.use(express.urlencoded());

app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", (req, res) => {
  res.json({ greeting: "hello API" });
});

app.post("/api/shorturl/new", (req, res) => {
  urlController.postNewUrl(req, res);
});

app.get("/api/shorturl/:short_url", (req, res) => {
  urlController.getUrl(req, res);
});

app.listen(port, function() {
  console.log("Node.js listening ...");
});

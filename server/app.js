// Vendor dependencies
const _ = require("lodash");
const bodyParser = require("body-parser");
const express = require("express");
const fse = require("fs-extra");
const sass = require("node-sass");

// App dependencies
const sassCompiler = require("./sassCompiler");

// Configure Express application
const app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// UI Routing
app.get("/", (req, res) => res.send("Hello world!"));

// API Routing
app.post("/api/compile", (req, res) => {
  res.json(req.body.variables);
  sassCompiler.sassCompiler(
    "./sass/main.scss",
    req.body.variables
  );
});

// Initiate server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

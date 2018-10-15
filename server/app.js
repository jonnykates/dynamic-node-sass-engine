// Vendor dependencies
const _ = require("lodash");
const express = require("express");
const fse = require("fs-extra");
const sass = require("node-sass");

// App dependencies
const sassCompiler = require("./sassCompiler");

// Configure Express application
const app = express();
let port = 3000;

// Routing
app.get("/", (req, res) => res.send("Hello world!"));
app.get("/compile", (req, res) => {
  res.send("Compiling");
  sassCompiler.sassCompiler(
    "./sass/main.scss",
    {
      colour: "blue"
    }
  );
});

// Initiate server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

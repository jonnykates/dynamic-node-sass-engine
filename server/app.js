// Vendor dependencies
const _ = require("lodash");
const bodyParser = require("body-parser");
const express = require("express");
const sass = require("node-sass");

// App dependencies
const sassCompiler = require("./sassCompiler");

// Configure Express application
const app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

// UI Routing
app.get("/", (req, res) => res.send("Hello world!"));

// API Routing
app.post("/api/compile", (req, res) => {
  var dataString =
    sassCompiler.sassVariables(req.body.variables) +
    sassCompiler.sassImport("./sass/main.scss");
  var sassOptions = _.assign({}, sassCompiler.sassOptions, {
    data: dataString
  });

  sass.render(sassOptions, function(err, result) {
    if (err) {
      console.log("error: " + err);
    } else {
      res.send(result.css.toString());
      sassCompiler.writeCssOutputToFile("./public/css/main.css", result.css);
    }
  });
});

// Initiate server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

// Vendor dependencies
const _ = require("lodash");
const autoprefixer = require("autoprefixer");
const bodyParser = require("body-parser");
const express = require("express");
const postcss = require("postcss");
const sass = require("node-sass");

// App dependencies
const sassCompiler = require("./sassCompiler");

// Configure Express application
const app = express();
let port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ type: "application/json" }));

// API Routing
app.post("/api/compile", (req, res) => {
  var dataString =
    sassCompiler.sassVariables(req.body.variables) +
    sassCompiler.sassImport(
      "./src/" + req.body.theme + "/" + req.body.theme + ".scss"
    );
  var sassOptions = _.assign({}, sassCompiler.sassOptions, {
    data: dataString
  });

  sass.render(sassOptions, function(err, result) {
    if (err) {
      res.send(err.message);
    } else {
      postcss([autoprefixer])
        .process(result.css)
        .then(function(result) {
          res.send(result.css.toString());
          sassCompiler.writeCssOutputToFile(
            "./dist/" + req.body.theme + "/" + req.body.theme + ".css",
            result.css
          );
        });
    }
  });
});

// Initiate server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

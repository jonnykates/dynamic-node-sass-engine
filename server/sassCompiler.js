const sass = require("node-sass");
const fse = require("fs-extra");
const _ = require("lodash");

sassVariable = (name, value) => {
  return "$" + name + ": " + value + ";";
};

sassVariables = variablesObj => {
  return Object.keys(variablesObj)
    .map(function(name) {
      return sassVariable(name, variablesObj[name]);
    })
    .join("\n");
};

sassImport = path => {
  return "@import '" + path + "';";
};

const sassOptionsDefaults = {
  includePaths: ["./sass/main.scss"],
  outputStyle: "compressed"
};

module.exports = {
  sassCompiler: (scssEntry, variables) => {
    var dataString = sassVariables(variables) + sassImport(scssEntry);
    var sassOptions = _.assign({}, sassOptionsDefaults, {
      data: dataString
    });

    sass.render(sassOptions, function(err, result) {
      if (err) {
        console.log("Error compiling: " + err);
      } else {
        console.log(result.css.toString());
        fse.outputFile("./public/css/main.css", result.css, function(err) {
          if (!err) {
            // file written on disk
          } else {
            console.log(err);
          }
        });
      }
    });
  }
};

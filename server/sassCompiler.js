const fse = require("fs-extra");
const _ = require("lodash");

sassVariable = (name, value) => {
  return "$" + name + ": " + value + ";";
};

module.exports = {
  sassVariables: variablesObj => {
    return Object.keys(variablesObj)
      .map(function(name) {
        return sassVariable(name, variablesObj[name]);
      })
      .join("\n");
  },
  sassImport: path => {
    return "@import '" + path + "';";
  },
  sassOptions: {
    outputStyle: "compressed"
  },
  writeCssOutputToFile: (dest, src) => {
    fse.outputFile(dest, src, function(err) {
      if (!err) {
        // file written on disk
      } else {
        console.log(err);
      }
    });
  }
};

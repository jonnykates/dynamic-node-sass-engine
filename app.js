var sass = require("node-sass");
var fse = require("fs-extra");
var _ = require("lodash");

var sassGenerator = require("./sassGenerator");

var sassOptionsDefaults = {
  includePaths: ["./sass/main.scss"],
  outputStyle: "compressed"
};

function dynamicSass(scssEntry, variables, handleSuccess, handleError) {
  var dataString =
    sassGenerator.sassVariables(variables) +
    sassGenerator.sassImport(scssEntry);
  var sassOptions = _.assign({}, sassOptionsDefaults, {
    data: dataString
  });

  sass.render(sassOptions, function(err, result) {
    if (err) {
      handleError(err);
    } else {
      handleSuccess(result);
    }
  });
}

function successFn(result) {
  console.log(result.css.toString());
  fse.outputFile("./public/css/main.css", result.css, function(err) {
    if (!err) {
      // file written on disk
    } else {
      console.log(err);
    }
  });
}

function errorFn(msg) {
  console.log(msg);
}

dynamicSass(
  "./sass/main.scss",
  {
    colour: "green"
  },
  successFn,
  errorFn
);

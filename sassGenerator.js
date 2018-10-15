function sassVariable(name, value) {
  return "$" + name + ": " + value + ";";
}

function sassVariables(variablesObj) {
  return Object.keys(variablesObj)
    .map(function(name) {
      return sassVariable(name, variablesObj[name]);
    })
    .join("\n");
}

function sassImport(path) {
  return "@import '" + path + "';";
}

module.exports = {
  sassVariables: sassVariables,
  sassImport: sassImport
};

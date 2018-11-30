const path = require("path");

const serverConfig = {
  mode: "production",
  target: "node",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js"
  }
};

module.exports = [serverConfig];

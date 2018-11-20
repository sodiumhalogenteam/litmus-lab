require("clear");
require("minimist");

var argv = require("minimist")(process.argv.slice(2));
console.dir(argv);

// website name (get from cmd line option -s)
var site = argv.s;
if (!site) {
  console.dir("Error: site name required.");
}
console.dir(site);

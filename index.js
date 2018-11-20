require("clear");
require("minimist");

// get command line args
var argv = require("minimist")(process.argv.slice(2));

// website name (get from cmd line option -s)
var site = argv.s;
if (!site) {
  console.dir("Error: site name required.");
}
console.dir(site);

// TODO: get html dom

// TODO: parse html dom
var htmlparser = require("htmlparser2");
var parser = new htmlparser.Parser(
  {
    onopentag: function(name, attribs) {
      if (name === "script" && attribs.type === "text/javascript") {
        console.log("JS! Hooray!");
      }
    },
    ontext: function(text) {
      console.log("-->", text);
    },
    onclosetag: function(tagname) {
      if (tagname === "script") {
        console.log("That's it?!");
      }
    }
  },
  { decodeEntities: true }
);
// insert entire dom here
parser.write(
  "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
);
parser.end();

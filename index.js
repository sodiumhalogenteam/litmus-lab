require("clear");
require("minimist");
var express = require("express");
var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

// get command line args
var argv = require("minimist")(process.argv.slice(2));

// website name (get from cmd line option -s)
var site = argv.s;
if (!site) {
  console.dir("Error: site name required.");
}

// TODO: get html dom
app.get("/scrape", function(req, res) {
  console.dir("in scrape");
  // The URL we will scrape from - in our example Anchorman 2.
  url = "http://www.sodiumhalogen.com";

  // The structure of our request call
  // The first parameter is our URL
  // The callback function takes 3 parameters, an error, response status code and the html

  request(url, function(error, response, html) {
    // First we'll check to make sure no errors occurred when making the request

    if (!error) {
      console.dir("in request");
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);

      $("#page-top").filter(function() {
        var data = $(this);
        console.dir(data);
      });
    } else {
      console.dir("error");
    }
  });
});
console.dir("out");

// TODO: parse html dom
// var htmlparser = require("htmlparser2");
// var parser = new htmlparser.Parser(
//   {
//     onopentag: function(name, attribs) {
//       if (name === "script" && attribs.type === "text/javascript") {
//         console.log("JS! Hooray!");
//       }
//     },
//     ontext: function(text) {
//       console.log("-->", text);
//     },
//     onclosetag: function(tagname) {
//       if (tagname === "script") {
//         console.log("That's it?!");
//       }
//     }
//   },
//   { decodeEntities: true }
// );
// // insert entire dom here
// parser.write(
//   "Xyz <script type='text/javascript'>var foo = '<<bar>>';</ script>"
// );
// parser.end();

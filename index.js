require("minimist");
const prompts = require("prompts");
const axios = require("axios");
const cheerio = require("cheerio");
var htmlparser = require("htmlparser2");

// parser
var parser = new htmlparser.Parser(
  {
    ontext: function(text) {
      if (text.includes("google-analytics.com/analytics.js")) {
        console.log("This site has Google Analytics");
      }
    }
  },
  { decodeEntities: true }
);

var input;
/*** Get Command Line Args ***/
(async function() {
  let questions = [
    {
      type: "text",
      name: "site",
      message: "What site would you like to check?"
    }
  ];

  let response = await prompts(questions);
  return response;
})();

input = getArgs();
site = input.site;

/*** Connect to Site ***/
axios
  .get(site)
  .then(({ data }) => {
    // format site data
    const $ = cheerio.load(data);
    var html = $.html();
    /*** Parse Html ***/
    parser.write(html);
    parser.end();
  })
  .catch(console.error);

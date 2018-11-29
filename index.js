const prompts = require("prompts");
const axios = require("axios");
const cheerio = require("cheerio");
var htmlparser = require("htmlparser2");

// parser
var parser = new htmlparser.Parser(
  {
    ontext: function(text) {
      // check for google analytics
      if (text.includes("google-analytics.com/analytics.js")) {
        console.log("This site has Google Analytics");
      } else {
        console.log("This site does not have Google Analytics");
      }
    }
  },
  { decodeEntities: true }
);

// check for http
const validateURI = site => {
  return site.includes("http://") ? site : "http://" + site;
};

// get site html and load it into cheerio, then parser
const testSite = site => {
  return axios
    .get(site)
    .then(({ data }) => {
      // format site data
      const $ = cheerio.load(data);
      var html = $.html();
      // console.log(html);
      /*** Parse Html ***/
      parser.write(html);
      parser.end();
    })
    .catch(console.error);
};

// get command line args; useful for multiple sites
var argv = require("yargs-parser")(process.argv.slice(2));
// website name (get from cmd line option -s)
var site = argv.s;

const main = async () => {
  const result = await prompts({
    type: "text",
    name: "site",
    initial: "sodiumhalogen.com",
    message: "What site would you like to check?"
  });

  const site = await validateURI(result.site);

  /*** Connect to Site ***/
  await testSite(site);
};
main();

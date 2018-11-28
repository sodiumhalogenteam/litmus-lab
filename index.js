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

const testSite = site => {
  return axios
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
};

const main = async () => {
  const result = await prompts({
    type: "text",
    name: "site",
    message: "What site would you like to check?"
  });
  const site = result.site;

  /*** Connect to Site ***/
  await testSite(site);
};
main();

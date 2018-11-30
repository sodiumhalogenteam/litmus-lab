import prompts from "prompts";
import axios from "axios";
import cheerio from "cheerio";
import htmlparser from "htmlparser2";
import yargsParser from "yargs-parser";

// parser
var parser = new htmlparser.Parser(
  {
    ontext: function(text) {
      // check for google analytics
      if (text.includes("google-analytics.com/analytics.js")) {
        console.log("This site has Google Analytics");
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
const testSite = (site, sitemap) => {
  return axios
    .get(site)
    .then(({ data }) => {
      if (sitemap) return 1;
      // format site data
      const $ = cheerio.load(data);
      var html = $.html();
      /*** Parse Html ***/
      parser.write(html);
      parser.end();
    })
    .catch(function error() {
      if (sitemap) return 0;
      else console.log(error);
    });
};

// get command line args; useful for multiple sites
var argv = yargsParser.parse(process.argv.slice(2));
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

  // test for google analytics
  await testSite(site, 0);

  // check for sitemap
  const sitemapUrl = site + "/sitemap.xml";
  /*** Connect to Site ***/
  var sitemap = await testSite(sitemapUrl, 1);
  if (!sitemap) {
    console.log("A sitemap does not exist for this site");
  } else {
    console.log("A sitemap does exist for this site");
  }
};
main();

#!/usr/bin/env node

const { exec } = require("child_process");
const prompts = require("prompts");
const cheerio = require("cheerio");
const https = require("https");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const pjson = require("./package.json");

// custom helpers and tests
const helpers = require("./src/helpers.js");
const tests = require("./src/site-testers.js");

// check user's global version
const checkVersion = () => {
  // TODO: add version tag - Chance 12/9/18 https://github.com/sodiumhalogenteam/litmus-lab/issues/7
  // let islitmusLabFound = false;
  // check if litmus-lab is installed
  // exec("litmus-lab --verison", function(err, stdout, stderr) {
  //   islitmusLabFound = !stdout.includes("command not found");
  // });

  // if (islitmusLabFound) {
  exec("npm show litmus-lab version", function(err, stdout, stderr) {
    const local = pjson.version.trim();
    const npm = stdout.trim().toString("utf8");
    // only check major and minor versioning
    if (local.slice(0, -1) < npm.slice(0, -1))
      console.log(
        " 😎",
        colors.green,
        `Litmus-Lab update available: ${stdout}`,
        colors.white,
        `  run $ npm update i -g litmus-lab`
      );
  });
  // }
};

let site;

// get command line args; useful for multiple sites
let argv = require("yargs-parser")(process.argv.slice(2));
// website name (get from cmd line option -s)
// let batchSites = argv.s;

const main = async () => {
  if (argv.version) {
    console.log("version", pjson.version);
    return;
  }
  site = argv.s;
  if (!site) {
    // prompt user for input
    result = await prompts({
      type: "text",
      name: "site",
      initial: "sodiumhalogen.com",
      message: "What site would you like to check?"
    });
    site = result.site;
  }

  site = await helpers.tidyURI(site);

  // get HTML from site
  const html = await axios
    .get(site, {
      params: {
        httpsAgent: new https.Agent({ keepAlive: true })
      }
    })
    .then(({ data }) => cheerio.load(data).html())
    .catch(function error() {
      console.log(error);
    });

  // test for google analytics
  await tests.findAnalytics(html, site);

  // check for noFollow
  await tests.checkForNoFollow(html, site);

  // check for sitemap
  await tests.checkForSitemap(site + "/sitemap.xml");

  // check 404 link errors
  const linkArray = await tests.collectLinks(html, site);
  await tests.checkLinks(linkArray, site);

  checkVersion();
};
main();

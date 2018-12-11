const { exec } = require("child_process");
const axios = require("axios");
const prompts = require("prompts");
const cheerio = require("cheerio");
const https = require("https");
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
const pjson = require("./package.json");

// custom helpers and tests
const helpers = require("./src/helpers.js");
const tests = require("./src/site-testers.js");

const RESULT = {
  FAIL: false,
  PASS: true
};

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
  let foundError = false;
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
  // get Google cache HTML from site
  let cacheCheckFailed = false;
  const googleCacheHtml = await axios
    .get(`http://webcache.googleusercontent.com/search?q=cache:${site}`, {
      params: {
        httpsAgent: new https.Agent({ keepAlive: true })
      }
    })
    .then(({ data }) => cheerio.load(data).html())
    .catch(function(error) {
      if (error.response) {
        if (error.response.status === 404) {
          helpers.consoleLog(
            RESULT.FAIL,
            `${site} was not found on Google cache [${error.response.status}]`
          );
          cacheCheckFailed = true;
        } else {
          helpers.consoleLog(
            RESULT.FAIL,
            `${site} an error was found [${error.response.status}]`,
            error.response.headers
          );
          // helpers.consoleLog(error.response.headers);
          // helpers.consoleLog(error.response.data);
          foundError = true;
        }
      }
    });

  // test for google analytics
  if (!foundError && !cacheCheckFailed)
    await tests.checkGoogleCache(googleCacheHtml, site);

  // get HTML from site
  let html = "";
  if (!foundError) {
    html = await axios
      .get(site, {
        params: {
          httpsAgent: new https.Agent({ keepAlive: true })
        }
      })
      .then(({ data }) => cheerio.load(data).html())
      .catch(function(error) {
        helpers.consoleLog(RESULT.FAIL, `${site} an error was found`, error);
        foundError = true;
      });
  }

  if (!foundError) {
    // test for google analytics
    await tests.findAnalytics(html, site);

    // check for noFollow
    await tests.checkForNoFollow(html, site);

    // check for sitemap
    await tests.checkForSitemap(site + "/sitemap.xml", site);

    // check 404 link errors
    const linkArray = await tests.collectLinks(html, site);
    await tests.checkLinks(linkArray, site);

    checkVersion();
  } else {
    console.log(`See above error to see why tests didn't start`);
  }
};
main();

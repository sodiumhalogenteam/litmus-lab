#!/usr/bin/env node

const prompts = require("prompts");
const axios = require("axios");
const cheerio = require("cheerio");
const { exec } = require("child_process");
const htmlparser = require("htmlparser2");
const tidyURI = require("./src/helpers.js");
const pjson = require("./package.json");

// palette
const colors = { red: "\x1b[31m", green: "\x1b[32m", white: "\x1b[37m" };

let site;
const RESULT = {
  FAIL: false,
  PASS: true
};

const consoleLog = (doesPass, txt) => {
  console.log(
    doesPass ? colors.green : colors.red,
    doesPass ? "✓" : "✕",
    colors.white,
    txt,
    site
  );
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

// format links for 404 checking
const formatLink = link => {
  if (link.startsWith("/") || link.startsWith("./")) {
    link = site + link;
  } else if (
    !link.includes(site) &&
    !link.startsWith("http") &&
    !link.startsWith("www")
  ) {
    link = site + "/" + link;
  }
  return link;
};

// check if links are website links or not
function isLink(link) {
  if (link[0] == "#") return 0;
  if (link.startsWith("mailto")) return 0;
  if (link.startsWith("tel")) return 0;
  if (link === "") return 0;
  return 1;
}

// 404 link checking parser
let collectLinks = async html => {
  let linkArr = [];
  const linkparser = await new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === "link" && attribs.href) {
          let link = attribs.href;
          if (!isLink(link)) return;
          link = formatLink(link);
          linkArr.push(link);
        } else if (name === "script" && attribs.src) {
          let link = attribs.src;
          if (!isLink(link)) return;
          link = formatLink(link);
          linkArr.push(link);
        } else if (name === "a" && attribs.href) {
          let link = attribs.href;
          if (!isLink(link)) return;
          link = formatLink(link);
          linkArr.push(link);
        } else if (name === "img" && attribs.src) {
          let link = attribs.src;
          if (!isLink(link)) return;
          link = formatLink(link);
          linkArr.push(link);
        }
      }
    },
    { decodeEntities: true }
  );
  await linkparser.write(html);
  await linkparser.end();
  return linkArr;
};

const getSiteHtml = site => {
  return axios
    .get(site)
    .then(({ data }) => {
      const $ = cheerio.load(data);
      return $.html();
    })
    .catch(function error() {
      console.log(error);
    });
};

const findAnalytics = html => {
  let isAnalyticsFound = false;
  let analyticsparser = new htmlparser.Parser(
    {
      ontext: function(text) {
        // check for google analytics
        if (text.includes("google-analytics.com/analytics.js"))
          isAnalyticsFound = true;
      },
      onopentag: function(name, attribs) {
        if (!attribs.src) return;
        if (name === "script" && attribs.src.includes("googletagmanager"))
          isAnalyticsFound = true;
      }
    },
    { decodeEntities: true }
  );
  // check for google analytics
  analyticsparser.write(html);
  analyticsparser.end();
  if (isAnalyticsFound) {
    consoleLog(RESULT.PASS, `${site} has Google Analytics`);
  } else {
    consoleLog(RESULT.FAIL, `${site} does not have Google Analytics`);
  }
};

const checkForNoFollow = html => {
  let noFollowFound = false;
  const nofollowparser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (!attribs.name || !attribs.content) return;
        if (
          name === "meta" &&
          attribs.name === "robots" &&
          attribs.content === "nofollow"
        ) {
          noFollowFound = true;
        }
      }
    },
    { decodeEntities: true }
  );
  // check for nofollow tag
  nofollowparser.write(html);
  nofollowparser.end();
  if (noFollowFound) {
    consoleLog(RESULT.FAIL, `${site} has a nofollow tag`);
  } else {
    consoleLog(RESULT.PASS, `${site} does not have a nofollow tag`);
  }
};

const testUrl = url => {
  return axios
    .get(url)
    .then(({ data }) => true)
    .catch(function error() {
      return false;
    });
};

const checkForSitemap = async sitemapUrl => {
  let sitemap = await testUrl(sitemapUrl);
  if (!sitemap) consoleLog(RESULT.FAIL, `A sitemap does not exist for ${site}`);
  else consoleLog(RESULT.PASS, `A sitemap does exist for ${site}`);
};

const checkLinks = async linksArrary => {
  let badLinks = 0;
  console.log(`Testing ${linksArrary.length} links...`);
  for (let i = 0; i < linksArrary.length; i++) {
    let goodLink = await testUrl(linksArrary[i]);
    if (!goodLink) {
      badLinks = 1;
      consoleLog(RESULT.FAIL, `${linksArrary[i]} leads to a 404`);
    }
  }
  if (!badLinks) {
    consoleLog(RESULT.PASS, `No 404 links were found on ${site}`);
  }
};

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

  site = await tidyURI(site);
  const html = await getSiteHtml(site);

  // test for google analytics
  await findAnalytics(html);

  // check for noFollow
  await checkForNoFollow();

  // check for sitemap
  await checkForSitemap(site + "/sitemap.xml");

  // check 404 link errors
  const linkArray = await collectLinks(html);
  await checkLinks(linkArray);

  checkVersion();
};
main();

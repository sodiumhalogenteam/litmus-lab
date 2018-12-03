#!/usr/bin/env node

const prompts = require("prompts");
const axios = require("axios");
const cheerio = require("cheerio");
const { exec } = require("child_process");
var htmlparser = require("htmlparser2");

var pjson = require("./package.json");

var site;
var linkArr = [];

// check user's global version
const checkVersion = () => {
  // TODO: add version tag - Chance 12/9/18 https://github.com/sodiumhalogenteam/litmus-lab/issues/6
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
    if (local.slice(0, -1) != npm.slice(0, -1))
      console.log(
        `\x1b[32m`, // green
        `😎  Litmus-Lab update available: ${stdout}`,
        "\x1b[37m", // white
        `run $ npm update i -g litmus-lab`
      );
  });
  // }
};

// format links for 404 checking
function formatLink(link) {
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
}

// check if links are website links or not
function isLink(link) {
  if (link[0] == "#") return 0;
  if (link.startsWith("mailto")) return 0;
  if (link.startsWith("tel")) return 0;
  if (link === "") return 0;
  return 1;
}

// google analytics parser
var analyticsparser = new htmlparser.Parser(
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

// 404 link checking parser
var linkparser = new htmlparser.Parser(
  {
    onopentag: function(name, attribs) {
      if (name === "link" && attribs.href) {
        var link = attribs.href;
        if (!isLink(link)) return;
        link = formatLink(link);
        linkArr.push(link);
      } else if (name === "script" && attribs.src) {
        var link = attribs.src;
        if (!isLink(link)) return;
        link = formatLink(link);
        linkArr.push(link);
      } else if (name === "a" && attribs.href) {
        var link = attribs.href;
        if (!isLink(link)) return;
        link = formatLink(link);
        linkArr.push(link);
      } else if (name === "img" && attribs.src) {
        var link = attribs.src;
        if (!isLink(link)) return;
        link = formatLink(link);
        linkArr.push(link);
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
// args: <site url>, <scraping mode>
/*
scrapping modes:
  0: google analytics
  1: check for 404
*/
const testSite = (site, mode) => {
  return axios
    .get(site)
    .then(({ data }) => {
      if (mode == 1) return 1;
      // format site data
      const $ = cheerio.load(data);
      var html = $.html();
      // check for google analytics
      analyticsparser.write(html);
      analyticsparser.end();
      linkparser.write(html);
      linkparser.end();
    })
    .catch(function error() {
      if (mode == 1) return 0;
      else console.log(error);
    });
};

// get command line args; useful for multiple sites
var argv = require("yargs-parser")(process.argv.slice(2));
// website name (get from cmd line option -s)
var batchSites = argv.s;

const main = async () => {
  const result = await prompts({
    type: "text",
    name: "site",
    initial: "sodiumhalogen.com",
    message: "What site would you like to check?"
  });

  site = await validateURI(result.site);

  // test for google analytics
  await testSite(site, 0);

  // check for sitemap
  const sitemapUrl = site + "/sitemap.xml";
  var sitemap = await testSite(sitemapUrl, 1);
  if (!sitemap) {
    console.log("A sitemap does not exist for this site");
  } else {
    console.log("A sitemap does exist for this site");
  }

  // check 404 link errors
  var badLinks = 0;
  for (var i = 0; i < linkArr.length; i++) {
    var goodLink = await testSite(linkArr[i], 1);
    if (!goodLink) {
      badLinks = 1;
      console.log(linkArr[i], "leads to a 404");
    }
  }
  if (!badLinks) {
    console.log("No 404 links were found");
  }

  checkVersion();
};
main();

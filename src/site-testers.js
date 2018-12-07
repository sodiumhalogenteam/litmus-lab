const axios = require("axios");
const cheerio = require("cheerio");
const htmlparser = require("htmlparser2");
const helpers = require("./helpers.js");

var exports = (module.exports = {});

const RESULT = {
  FAIL: false,
  PASS: true
};

// 404 link checking parser
exports.collectLinks = async (html, site) => {
  let linkArr = [];
  const linkparser = await new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (name === "link" && attribs.href) {
          let link = attribs.href;
          if (!helpers.isLink(link)) return;
          link = helpers.formatLink(link, site);
          linkArr.push(link);
        } else if (name === "script" && attribs.src) {
          let link = attribs.src;
          if (!helpers.isLink(link)) return;
          link = helpers.formatLink(link, site);
          linkArr.push(link);
        } else if (name === "a" && attribs.href) {
          let link = attribs.href;
          if (!helpers.isLink(link)) return;
          link = helpers.formatLink(link, site);
          linkArr.push(link);
        } else if (name === "img" && attribs.src) {
          let link = attribs.src;
          if (!helpers.isLink(link)) return;
          link = helpers.formatLink(link, site);
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

exports.getSiteHtml = site => {
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

exports.findAnalytics = (html, site) => {
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
    helpers.consoleLog(RESULT.PASS, `${site} has Google Analytics`);
  } else {
    helpers.consoleLog(RESULT.FAIL, `${site} does not have Google Analytics`);
  }
};

exports.checkForNoFollow = (html, site) => {
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
    helpers.consoleLog(RESULT.FAIL, `${site} has a nofollow tag`);
  } else {
    helpers.consoleLog(RESULT.PASS, `${site} does not have a nofollow tag`);
  }
};

exports.testUrl = url => {
  return axios
    .get(url)
    .then(({ data }) => true)
    .catch(function error() {
      return false;
    });
};

exports.checkForSitemap = async (sitemapUrl, site) => {
  let sitemap = await exports.testUrl(sitemapUrl);
  if (!sitemap)
    helpers.consoleLog(RESULT.FAIL, `A sitemap does not exist for ${site}`);
  else helpers.consoleLog(RESULT.PASS, `A sitemap does exist for ${site}`);
};

exports.checkLinks = async (linksArray, site) => {
  let badLinks = 0;
  for (let i = 0; i < linksArray.length; i += 1) {
    let goodLink = await exports.testUrl(linksArray[i]);
    if (!goodLink) {
      badLinks = 1;
      helpers.consoleLog(RESULT.FAIL, `${linksArray[i]} leads to a 404`);
    }
  }
  if (!badLinks) {
    helpers.consoleLog(
      RESULT.PASS,
      `No 404 links were found on ${site}. [Count: ${linksArray.length} links]`
    );
  }
};

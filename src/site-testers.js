const axios = require("axios");
const htmlparser = require("htmlparser2");
const helpers = require("./helpers.js");
const https = require("https");

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
    return true;
  } else {
    helpers.consoleLog(RESULT.FAIL, `${site} does not have Google Analytics`);
    return false;
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
    return true;
  } else {
    helpers.consoleLog(RESULT.PASS, `${site} does not have a nofollow tag`);
    return false;
  }
};

exports.checkGoogleCache = (html, site) => {
  let isCacheFound = html.includes("This is Google");
  if (isCacheFound) {
    helpers.consoleLog(RESULT.PASS, `${site} is cached by Google`);
    return true;
  } else {
    helpers.consoleLog(RESULT.FAIL, `${site} is not cached by Google`);
    return false;
  }
};

exports.testUrl = url => {
  return axios
    .get(url, {
      params: {
        httpsAgent: new https.Agent({ keepAlive: true })
      }
    })
    .then(({ data }) => true)
    .catch(function error() {
      return false;
    });
};

exports.checkForSitemap = async (sitemapUrl, site) => {
  let sitemap = await exports.testUrl(sitemapUrl);
  if (!sitemap) {
    helpers.consoleLog(RESULT.FAIL, `A sitemap does not exist for ${site}`);
    return false;
  } else {
    helpers.consoleLog(RESULT.PASS, `A sitemap does exist for ${site}`);
    return true;
  }
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
    return false;
  } else {
    return true;
  }
};

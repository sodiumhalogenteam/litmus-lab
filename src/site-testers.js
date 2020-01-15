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

exports.findAnalytics = (html, site, filtered) => {
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
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `site has Google Analytics`);
  }
}
    return true;
  } else {
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `site does not have Google Analytics`);
    }
    return false;
  }
};

exports.checkForNoFollow = (html, site, filtered) => {
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
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `site has a nofollow tag`);
    }
    return true;
  } else {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `site does not have a nofollow tag`);
  }
}
    return false;
  }
};

exports.checkGoogleCache = (html, site, filtered) => {
  let isCacheFound = html.includes("This is Google");
  if (isCacheFound) {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `site is cached by Google`);
    }
  }
    return true;
  } else {
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `site is not cached by Google`);
    }
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
exports.checkForJquery = async (html, site, filtered) => {
  let jqueryVersion = 'none';
  const jqueryParser = new htmlparser.Parser(
    {
      onopentag: function(name, attribs) {
        if (!attribs.src) return;
        if (
          name === "script" &&
          attribs.src.includes("jquery-")
        ) {
          jqueryVersion = attribs.src.split("jquery-")[1];
        }
      }
    },
    { decodeEntities: true }
  );

  // check for nofollow tag
  jqueryParser.write(html);
  jqueryParser.end();

  if (jqueryVersion === "none") {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `site does not have jQuery`);
  }
}
    return false;
  }
  else if (jqueryVersion < "3.4.0") {
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `jQuery version is unsafe`);
    }
    return true;
  }
  else {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `jQuery version is safe`);
    }
  }
    return true;
  }
}

exports.checkForSitemap = async (sitemapUrl, site, filtered) => {
  let sitemap = await exports.testUrl(sitemapUrl);
  if (!sitemap) {
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `sitemap does not exist`);
    }
    return false;
  } else {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `sitemap exists`);
  }
}
    return true;
  }
};
/* This Console Error Checker does not work yet. Right now all it does is say that every site 
has no Javascript console errors because I don't know how to build something that allows for 
me to check if a site has console errors. */ 
exports.checkForConsoleErrors = async (html, site, filtered) => {
  let consoleErrorCount = 0; 
  /* the code for finding the error should be here. if an error is found, consoleErrorCount
  variable should increment by 1 until the tool has checked the console logs completely */ 
  
  if (!consoleErrorCount) {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(RESULT.PASS, `There are no console errors.`); 
    }
  }
    return false; 
  } else {
    if (!json) {
    helpers.consoleLog(RESULT.FAIL, `There are ${consoleErrorCount} console errors`);
    } 
  }
}

exports.checkLinks = async (linksArray, site, filtered) => {
  let badLinks = 0;
  for (let i = 0; i < linksArray.length; i += 1) {
    let goodLink = await exports.testUrl(linksArray[i]);
    if (!goodLink) {
      badLinks = 1;
      if (!json) {
      helpers.consoleLog(RESULT.FAIL, `${linksArray[i]} leads to a 404`);
      }
    }
  }
  if (!badLinks) {
    if (!json) {
    if (filtered == false) {
    helpers.consoleLog(
      RESULT.PASS,
      `No 404 links were found on this site. [Count: ${linksArray.length} links]`
    );
  }
}
    return false;
  } else {
    return true;
  }
};

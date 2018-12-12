var exports = (module.exports = {});

// check for http
exports.tidyURI = site => {
  if (!site.includes("www.")) site = "www." + site;
  if (site.includes("http://")) return site;
  if (site.includes("htp://")) return site.replace("htp://", "http://");
  if (site.includes("htt://")) return site.replace("htt://", "http://");
  if (site.includes("https://")) return site;
  return "http://" + site;
};

// palette
exports.colors = { red: "\x1b[31m", green: "\x1b[32m", white: "\x1b[37m" };
const colors = { red: "\x1b[31m", green: "\x1b[32m", white: "\x1b[37m" };

exports.consoleLog = (doesPass, txt) => {
  console.log(
    doesPass ? colors.green : colors.red,
    doesPass ? "✓" : "✕",
    colors.white,
    txt
  );
};

// format links for 404 checking
exports.formatLink = (link, site) => {
  if (link.startsWith("/") || link.startsWith("./")) {
    link = link.replace("./", "/");
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
exports.isLink = link => {
  if (link[0] == "#") return 0;
  if (link.startsWith("mailto")) return 0;
  if (link.startsWith("tel")) return 0;
  if (link === "") return 0;
  return 1;
};

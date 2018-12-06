// check for http
const tidyURI = site => {
  if (site.includes("http://")) return site;
  if (site.includes("htp://")) return site.replace("htp://", "http://");
  if (site.includes("htt://")) return site.replace("htt://", "http://");
  if (site.includes("https://")) return site;
  return "http://" + site;
};
module.exports = tidyURI;

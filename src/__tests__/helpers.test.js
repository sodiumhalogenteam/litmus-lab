const helpers = require("../helpers.js");

test("tidyURI() can tidy URI", () => {
  const site = "sodiumhalogen.com";
  const siteHttp = "http://sodiumhalogen.com";
  const siteHttp2 = "htp://sodiumhalogen.com";
  const siteHttp3 = "htt://sodiumhalogen.com";
  const siteHttps = "https://sodiumhalogen.com";

  const updatedSite = helpers.tidyURI(site);
  expect(updatedSite).toBe("http://sodiumhalogen.com");

  const updatedSiteHttp = helpers.tidyURI(siteHttp);
  expect(updatedSiteHttp).toBe("http://sodiumhalogen.com");

  const updatedSite2 = helpers.tidyURI(siteHttp2);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSite3 = helpers.tidyURI(siteHttp3);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSiteHttps = helpers.tidyURI(siteHttps);
  expect(updatedSiteHttps).toBe("https://sodiumhalogen.com");
});

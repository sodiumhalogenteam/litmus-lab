const tidyURI = require("../helpers.js");

test("tidyURI() can tidy URI", () => {
  const site = "sodiumhalogen.com";
  const siteHttp = "http://sodiumhalogen.com";
  const siteHttp2 = "htp://sodiumhalogen.com";
  const siteHttp3 = "htt://sodiumhalogen.com";
  const siteHttps = "https://sodiumhalogen.com";

  const updatedSite = tidyURI(site);
  expect(updatedSite).toBe("http://sodiumhalogen.com");

  const updatedSiteHttp = tidyURI(siteHttp);
  expect(updatedSiteHttp).toBe("http://sodiumhalogen.com");

  const updatedSite2 = tidyURI(siteHttp2);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSite3 = tidyURI(siteHttp3);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSiteHttps = tidyURI(siteHttps);
  expect(updatedSiteHttps).toBe("https://sodiumhalogen.com");
});

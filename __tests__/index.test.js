const validateURI = require("../index.js");

test("validateURI() can tidy URI", () => {
  const site = "sodiumhalogen.com";
  const siteHttp = "http://sodiumhalogen.com";
  const siteHttp2 = "htp://sodiumhalogen.com";
  const siteHttp3 = "htt://sodiumhalogen.com";
  const siteHttps = "https://sodiumhalogen.com";

  const updatedSite = validateURI(site);
  expect(updatedSite).toBe("http://sodiumhalogen.com");

  const updatedSiteHttp = validateURI(siteHttp);
  expect(updatedSiteHttp).toBe("http://sodiumhalogen.com");

  const updatedSite2 = validateURI(siteHttp2);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSite3 = validateURI(siteHttp3);
  expect(updatedSite2).toBe("http://sodiumhalogen.com");

  const updatedSiteHttps = validateURI(siteHttps);
  expect(updatedSiteHttps).toBe("https://sodiumhalogen.com");
});

const validateURI = require("../index.js");

test("validateURI() can tidy URI", () => {
  const site = "sodiumhalogen.com";
  const siteHttp = "http://sodiumhalogen.com";
  // const siteHttps = "http://sodiumhalogen.com";

  const updatedSite = validateURI(site);
  expect(updatedSite).toBe("http://sodiumhalogen.com");

  const updatedSiteHttp = validateURI(siteHttp);
  expect(updatedSiteHttp).toBe("http://sodiumhalogen.com");

  // const updatedSiteHttps = validateURI(siteHttps);
  // expect(updatedSiteHttps).toBe('http://sodiumhalogen.com');
});

const helpers = require("../helpers.js");
console.log = jest.fn();

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

test("consoleLog() logs out", () => {
  let log = helpers.consoleLog(true, "sodiumhalogen.com");
  // test last argument in log that === text
  expect(console.log.mock.calls[0][3]).toBe("sodiumhalogen.com");
});

test("formatLink() adjusts link into valid link", () => {
  let link = helpers.formatLink("/about", "sodiumhalogen.com");
  expect(link).toBe("sodiumhalogen.com/about");

  link = helpers.formatLink("./about", "sodiumhalogen.com");
  expect(link).toBe("sodiumhalogen.com./about");

  link = helpers.formatLink("./about/", "sodiumhalogen.com");
  expect(link).toBe("sodiumhalogen.com./about/");

  link = helpers.formatLink("sodiumhalogen.com/about", "sodiumhalogen.com");
  expect(link).toBe("sodiumhalogen.com/about");

  link = helpers.formatLink(
    "http://sodiumhalogen.com/about",
    "sodiumhalogen.com"
  );
  expect(link).toBe("http://sodiumhalogen.com/about");

  link = helpers.formatLink(
    "https://sodiumhalogen.com/about",
    "sodiumhalogen.com"
  );
  expect(link).toBe("https://sodiumhalogen.com/about");

  link = helpers.formatLink("www.sodiumhalogen.com/about", "sodiumhalogen.com");
  expect(link).toBe("www.sodiumhalogen.com/about");

  link = helpers.formatLink("www.sodiumhalogen.com/about", "sodiumhalogen.com");
  expect(link).toBe("www.sodiumhalogen.com/about");

  link = helpers.formatLink("about", "sodiumhalogen.com");
  expect(link).toBe("sodiumhalogen.com/about");
});

test("isLink() validates if link", () => {
  let link = helpers.isLink("sodiumhalogen.com");
  expect(link).toBe(1);

  link = helpers.isLink("http://sodiumhalogen.com");
  expect(link).toBe(1);

  link = helpers.isLink("https://sodiumhalogen.com");
  expect(link).toBe(1);

  link = helpers.isLink("#Designtific-Method");
  expect(link).toBe(0);

  link = helpers.isLink("mailto:reallyreallyfake@email.com");
  expect(link).toBe(0);

  link = helpers.isLink("tel:1234567890");
  expect(link).toBe(0);

  link = helpers.isLink("");
  expect(link).toBe(0);
});

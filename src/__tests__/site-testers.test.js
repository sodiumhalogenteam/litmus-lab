const https = require("https");
const mockAxios = require("axios");
const tests = require("../site-testers.js");
console.log = jest.fn();

afterEach(() => {
  // cleaning up the mess left behind the previous test
  mockAxios.get.mockClear();
  mockAxios.get.mockReset();
});

const httpsParams = {
  params: {
    httpsAgent: new https.Agent({ keepAlive: true })
  }
};

const shHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Application design and development, User Experience &amp; User Interface Design for Web, Mobile and VirtualReality</title><meta name="description" content="We create customer centered and results focused applications for web, mobile and virtual reality | Jackson, TN &amp; Nashville, TN"/><link rel="shortcut icon" href="/favicon.ico" type="image/x-icon"/><link rel="apple-touch-icon" href="/apple-touch-icon.png"/><link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png"/><link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png"/><link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png"/><link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png"/><link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-60x60.png"/><link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-120x120.png"/><link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-76x76.png"/><link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-152x152.png"/><link href="assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet"><link href='https://fonts.googleapis.com/css?family=Open+Sans:700italic,700' rel='stylesheet' type='text/css'><link href='https://fonts.googleapis.com/css?family=Merriweather:400,400italic' rel='stylesheet' type='text/css'><link href="assets/css/styles.min.css" rel="stylesheet"><!--[if lt IE 9]><script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script><script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script><![endif]--></head><body id="page-top"><div id="particles-js"></div><div class="team-gifs"><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/adam-thumbs-up-punch.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/brantley-double-thumbs.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/brantley-down-and-out.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/dance-thumbs-up-wm.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/fistbump-camera.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/moshed_2016-1-26_4.29.25.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/onit.gif" alt=""></figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/shane-kiss.gif" alt=""></figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/team-celebrate.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/thumbsup-fistbump2.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/zach-keep-it-coming.gif" alt=""> </figure></div><div class="hover-gif"><figure class="hover-gif__img"> <img class="js-lazy-image" src="" data-src="./assets/img/gifs/zach-on-it.gif" alt=""></figure></div></div><nav id="mainNav" class="navbar navbar-default container"><div class="nav-inner"> <a class="navbar-brand" href="#page-top"><img src="./assets/img/logo-sh.png" alt="Sodium Halogen logo"></a></div></nav><header class="section-spacing"><div class="header-content container"><div class="row header-content-inner"><div class="col-md-12 text-center"><h1>We believe creating great digital products starts with <em>your</em> customer. This leads to more profitableapplications because they actually solve human problems.</h1> <a href="#method" class="btn btn-primary btn-xl sr-button js-scroll-trigger">Howdo we apply what we believe?</a></div></div></div></header><section><div class="container section-spacing"><div class="row"><div class="col-lg-10 col-lg-offset-1 drop-in text-center"><h2 id="method">Our Designtific Method focuses on solving your customers’ problems while accomplishing yourbusiness goals.</h2></div><div class="col-lg-10 col-lg-offset-1 drop-in-wait"> <img src="./assets/img/Designtific-Method-molecule.png" alt="Sodium Halogen Designtific Method molecule" class="img-center img-responsive my-100"> </div><div class="col-lg-10 col-lg-offset-1 drop-in"><p>Our small, multi-disciplinary team has spent the last 17 years experimenting and refining our process forturning great ideas into solid strategy and great digital products and experiences.</p><a href="#services" class="btn btn-primary btn-xl sr-button js-scroll-trigger">Whatdo we do?</a></div></div></div></section><section><!-- <div id="services-image-stack" class="image-stack"><img src="https://sh-drop.s3.us-east-1.amazonaws.com/wd/SH-work-with-client.jpg" alt="" class="active"></div>--><div class="container section-spacing"><div class="row"><div class="col-lg-10 col-lg-offset-1 drop-in text-center"><h2 id="services">We create</h2></div><div id="service1" class="col-md-6"> <img src="assets/img/icons/software-development-temp.png" class="icon"><h3>Software/application design &amp; development</h3><p>Does your organization have internal processes that software could automate? Maybe a web-based or mobileapplication is the core of your company?<br><br>Our team can leverage our experience working with Bay Areastartups and enterprise companies. Together we can create apps that are intuitive, software that saves your teamtime and money and mobile apps that delight. <em>Sound interesting?</em></p><p class="mb-100"><a href="#contact" class="js-scroll-trigger"><em>Let’s chat.</em></a></p><img src="assets/img/icons/user-experience-temp.png" class="icon"><h3>Interaction design (UX/UI)</h3><p>Is your website or application not converting the way it should? Are users getting stuck or not understandinghow to accomplish simple tasks?<br><br>Research, strategy, sketching and prototyping are the tools we’ll use tocraft a user experience as beautiful as the user interface.</p><p class="mb-100"><a href="#contact" class="js-scroll-trigger"><em>Let’s create something beautifully effectivetogether.</em></a></p></div><div id="service2" class="col-md-6"> <img src="assets/img/icons/brand-creation-temp.png" class="icon"><h3>Brand design &amp; development</h3><p>Does your brand reflect who you are as an organization? Does it show your uniqueness and inspire trust?<br><br>Webelieve your team knows what you really stand for, but might not have taken the time to really understand whoyour customer is and what your company’s purpose is. <em>Looking to discover your new brand and share it with theworld?</em></p><p class="mb-100"><a href="#contact" class="js-scroll-trigger"><em>Let’s discover together.</em></a></p><img src="assets/img/icons/virtual-reality-temp.png" class="icon"><h3>Virtual Reality design &amp; development</h3><p>Got a crazy brilliant idea for how you can use virtual reality to accomplish your business goals? Or maybe youneed help coming up with that crazy idea? Sounds like our kind of crazy.<br><br>We’ve built immersive experiencesfor the Oculus Rift and HTC Vive. <em>Intrigued?</em></p><p class="mb-100"><a href="#contact" class="js-scroll-trigger"><em>Let’s put our heads together.</em></a></p></div><div class="col-lg-10 col-lg-offset-1 drop-in text-center"> <a href="#customers" class="btn btn-primary btn-xl sr-button js-scroll-trigger">Whohave we worked with?</a> </div></div></div></section><section class="bg-primary py-100" id="customers"><div class="container"><div class="row"><div class="col-lg-8 col-lg-offset-2 text-center"><h2>Over the past 15 years, we've helped lots of companies</h2><hr class="light"></div><div class="col-lg-12 text-center"> <img src="./assets/img/logo-images/logo-vandy.png" alt=""> <img src="./assets/img/logo-images/logo-network-for-good.png" alt=""> <img src="./assets/img/logo-images/logo-iron.png" alt=""> <img src="./assets/img/logo-images/logo-estate-assist.png" alt=""> <img src="./assets/img/logo-images/logo-popvox.png" alt=""> <img src="./assets/img/logo-images/logo-ge-capital.png" alt=""> <img src="./assets/img/logo-images/logo-haven.png" alt=""> <img src="./assets/img/logo-images/logo-allygn.png" alt=""> <img src="./assets/img/logo-images/logo-bypass.png" alt=""> <img src="./assets/img/logo-images/logo-chick-fil-a.png" alt=""> <img src="./assets/img/logo-images/logo-zonda.png" alt=""> <img src="./assets/img/logo-images/logo-mars.png" alt=""><hr class="light"><p class="text-faded">Over 300 companies from startups to enterprise</p></div></div></div></section><section><div class="container drop-in py-100"><div class="row"><div class="col-sm-8 col-sm-offset-2" id="testimonial"><p>"Sodium Halogen has everything I look for in a UX designer: Great taste, a hunger for new approaches, a logicalmind, and humility that makes them a delight to work with. Even working remotely, They are fantasticcollaborators, sharing in idea generation, giving and taking feedback, and delivering great work on time."</p></div><div class="col-md-offset-2 col-sm-3 col-sm-offset-2 col-xs-4 text-center"> <img src="http://www.sodiumhalogen.com/wp-content/uploads/2011/12/janicefraser-130x130.jpg" alt="Janice Fraser" class="img-circle mt-10"> </div><div class="col-sm-5 col-xs-8 pt-40"> <cite>Janice Fraser – <a href="http://bionicsolution.com/">Chief ProductOfficer at Bionic Solution and founding CEO of Adaptive Path, the world’s first User Experience firm</a></cite></div></div><div class="row"><div class="col-sm-12 mt-100 text-center"> <a href="#contact" class="btn btn-primary btn-xl sr-button js-scroll-trigger">Readyto learn more?</a> </div></div></div></section><section><div class="container drop-in"><div class="row"><div class="col-sm-12 team" id="team"><h2>Our designtists</h2><div class="row"><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/william_head_sm-e1517091609512.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">William Donnell</p><p class="team__title">Founder &amp; Lead Desgintist</p><p class="team__email"><a href="mailto:wm@SodiumHalogen.com" class="btn">email William</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/wd/team-barrett-gay-1.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Barrett Gay</p><p class="team__title">Founder &amp; Sr. Software &amp; VR Dev</p><p class="team__email"><a href="mailto:barrett@SodiumHalogen.com" class="btn">email Barrett</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/wd/team-quincy-jones-1.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Quincy Jones</p><p class="team__title">Founder &amp; Sr. Hardware &amp; VR Dev</p><p class="team__email"><a href="mailto:quincy@SodiumHalogen.com" class="btn">email Quincy</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/shane_sm.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Shane Aday</p><p class="team__title">Design Alchemist</p><p class="team__email"><a href="mailto:shane@SodiumHalogen.com" class="btn">email Shane</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/chance_smith-sh1.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Chance Smith</p><p class="team__title">Innovation Strategist</p><p class="team__email"><a href="mailto:chance@SodiumHalogen.com" class="btn">email Chance</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/team-brantley.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Brantley English</p><p class="team__title">Code Architect</p><p class="team__email"><a href="mailto:brantley@SodiumHalogen.com" class="btn">email Brantley</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/zb/zach-head-bw.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Zach Boatwright</p><p class="team__title">Content Agronomist</p><p class="team__email"><a href="mailto:zach@SodiumHalogen.com" class="btn">email Zach</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/jill_sm.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Jill Donnell</p><p class="team__title">Pure Awesome</p><p class="team__email"><a href="mailto:jill@SodiumHalogen.com" class="btn">email Jill</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/cs/adam-curl-sh.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Adam Curl</p><p class="team__title">Code Chemist</p><p class="team__email"><a href="mailto:adam@SodiumHalogen.com" class="btn">email Adam</a></p></div><div class="col-xs-6 col-sm-4 col-md-3 team__member"><div class="polygon-each-img-wrap"> <img src="https://sh-drop.s3.us-east-1.amazonaws.com/wd/braden-donnell-2.jpg" alt="demo-clip-heptagon" class="polygon-clip-hexagon"> </div><p class="team__name">Braden Donnell</p><p class="team__title">Photography &amp; Video</p><p class="team__email"><a href="mailto:braden@SodiumHalogen.com" class="btn">email Braden</a></p></div><svg class="clip-svg"><defs><clipPath id="polygon-clip-hexagon" clipPathUnits="objectBoundingBox"><polygon points="0.5 0, .9 0.25, .9 0.75, 0.5 1, .05 0.75, .05 0.25"/></clipPath></defs></svg></div></div></div></div></section><section class="bg-dark footer"><div class="container vcenter"><div class="row"><div id="contact" class="col-lg-6 col-lg-offset-3 text-center"><h2>Your bottom-line called and wants to know how our Designtific Method can help.</h2> <a href="http://bit.ly/shform" class="btn btn-primary btn-xl sr-button">Tell us about your project</a></div><div class="footer__bottom"><div class="col-md-6"><ul><li> Jackson, TN <br/> <a href="tel:731-506-4535">731.506.4535</a> </li><li> Nashville, TN <br/> <a href="tel:615-382-1550">615.382.1550</a> </li><li> Secret HQ <br/> <a href="#">***.***.****</a> </li></ul></div><div class="col-md-6"><p>Ask us a Question</p><a href="mailto:info@sodiumhalogen.com">info@sodiumhalogen.com</a></div></div></div></div></section><script src="./assets/vendor/jquery/jquery-3.3.1.min.js"></script><script src="./assets/vendor/jquery/jquery.ease.js"></script><script src="./assets/vendor/scrollreveal/scrollreveal.min.js"></script><script src="http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"></script><script src="./assets/js/main.min.js"></script><script src="./assets/js/lazyLoadImages.js"></script><script>(function (i, s, o, g, r, a, m){i['GoogleAnalyticsObject']=r; i[r]=i[r] || function (){(i[r].q=i[r].q || []).push(arguments)}, i[r].l=1 * new Date(); a=s.createElement(o),m=s.getElementsByTagName(o)[0]; a.async=1; a.src=g; m.parentNode.insertBefore(a, m)})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');ga('create', 'UA-58073333-1', 'auto');ga('send', 'pageview');</script><script src="https://embed.small.chat/T025QE08NG51JTPH2R.js" async></script></body></html>`;

const shHtmlWithNoFollow = `<!DOCTYPE html><html lang="en"><head><meta name="robots" content="nofollow" /></head><body id="page-top"></body></html>`;
const shHtmlWithNewAnalytics = `<!DOCTYPE html><html lang="en"><head></head><body id="page-top"><script async src="https://www.googletagmanager.com/gtag/js?id=UA-33562331-2"></script></body></html>`;

test("findAnalytics() finds GA", () => {
  let foundGA = tests.findAnalytics(shHtml, "sodiumhaloge.com");
  expect(foundGA).toBe(true);

  foundGA = tests.findAnalytics(shHtmlWithNewAnalytics, "sodiumhaloge.com");
  expect(foundGA).toBe(true);

  foundGA = tests.findAnalytics(shHtmlWithNoFollow, "sodiumhaloge.com");
  expect(foundGA).toBe(false);
});

test("checkForNoFollow() finds GA", () => {
  let foundNoFollow = tests.checkForNoFollow(shHtml, "sodiumhalogen.com");
  expect(foundNoFollow).toBe(false);

  foundNoFollow = tests.checkForNoFollow(
    shHtmlWithNoFollow,
    "sodiumhalogen.com"
  );
  expect(foundNoFollow).toBe(true);
});

test("collectLinks() finds GA", async () => {
  const linksArray = await tests.collectLinks(shHtml, "sodiumhalogen.com");
  const foundLinksExample = [
    "sodiumhalogen.com/favicon.ico",
    "sodiumhalogen.com/apple-touch-icon.png",
    "sodiumhalogen.com/apple-touch-icon-57x57.png",
    "sodiumhalogen.com/apple-touch-icon-72x72.png",
    "sodiumhalogen.com/apple-touch-icon-114x114.png",
    "sodiumhalogen.com/apple-touch-icon-144x144.png",
    "sodiumhalogen.com/apple-touch-icon-60x60.png",
    "sodiumhalogen.com/apple-touch-icon-120x120.png",
    "sodiumhalogen.com/apple-touch-icon-76x76.png",
    "sodiumhalogen.com/apple-touch-icon-152x152.png",
    "sodiumhalogen.com/assets/vendor/bootstrap/css/bootstrap.min.css",
    "https://fonts.googleapis.com/css?family=Open+Sans:700italic,700",
    "https://fonts.googleapis.com/css?family=Merriweather:400,400italic",
    "sodiumhalogen.com/assets/css/styles.min.css",
    "sodiumhalogen.com/assets/img/logo-sh.png",
    "sodiumhalogen.com/assets/img/Designtific-Method-molecule.png",
    "sodiumhalogen.com/assets/img/icons/software-development-temp.png",
    "sodiumhalogen.com/assets/img/icons/user-experience-temp.png",
    "sodiumhalogen.com/assets/img/icons/brand-creation-temp.png",
    "sodiumhalogen.com/assets/img/icons/virtual-reality-temp.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-vandy.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-network-for-good.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-iron.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-estate-assist.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-popvox.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-ge-capital.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-haven.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-allygn.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-bypass.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-chick-fil-a.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-zonda.png",
    "sodiumhalogen.com/assets/img/logo-images/logo-mars.png",
    "http://www.sodiumhalogen.com/wp-content/uploads/2011/12/janicefraser-130x130.jpg",
    "http://bionicsolution.com/",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/william_head_sm-e1517091609512.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/wd/team-barrett-gay-1.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/wd/team-quincy-jones-1.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/shane_sm.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/chance_smith-sh1.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/team-brantley.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/zb/zach-head-bw.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/jill_sm.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/cs/adam-curl-sh.jpg",
    "https://sh-drop.s3.us-east-1.amazonaws.com/wd/braden-donnell-2.jpg",
    "http://bit.ly/shform",
    "sodiumhalogen.com/assets/vendor/jquery/jquery-3.3.1.min.js",
    "sodiumhalogen.com/assets/vendor/jquery/jquery.ease.js",
    "sodiumhalogen.com/assets/vendor/scrollreveal/scrollreveal.min.js",
    "http://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js",
    "sodiumhalogen.com/assets/js/main.min.js",
    "sodiumhalogen.com/assets/js/lazyLoadImages.js",
    "https://embed.small.chat/T025QE08NG51JTPH2R.js"
  ];
  expect(linksArray).toEqual(foundLinksExample);
});

test("testUrl() fetch HTML", async () => {
  const catchFn = jest.fn();
  const thenFn = jest.fn();
  mockAxios.get.mockImplementationOnce(() => Promise.resolve(true));

  const testUrl = await tests
    .testUrl("sodiumhalogen.com", httpsParams)
    .then(thenFn)
    .catch(catchFn);

  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // expect(mockAxios.get).toHaveBeenCalledWith("sodiumhalogen.com", httpsParams);
  expect(thenFn).toHaveBeenCalledTimes(1);
  expect(catchFn).not.toHaveBeenCalled();

  mockAxios.get.mockImplementationOnce(() =>
    Promise.reject("Testing static reject")
  );
  const testFailedUrl = await tests
    .testUrl("")
    .then(() => {
      throw "Uh-oh!";
    })
    .catch(catchFn);
  expect(catchFn).toHaveBeenCalledTimes(1);
});

test("checkForSitemap() checks sitemap url", async () => {
  const catchFn = jest.fn();
  const thenFn = jest.fn();

  mockAxios.get.mockImplementationOnce(() => Promise.resolve(true));
  const testSitemap = await tests
    .checkForSitemap("sodiumhalogen.com/sitemap.xml", httpsParams)
    .then(() => true);
  expect(mockAxios.get).toHaveBeenCalledTimes(1);
  // expect(mockAxios.get).toHaveBeenCalledWith(
  //   "sodiumhalogen.com/sitemap.xml",
  //   httpsParams
  // );
  expect(testSitemap).toBeTruthy();

  mockAxios.get.mockImplementationOnce(() => Promise.resolve(false));
  const testBadSitemap = await tests
    .checkForSitemap("sodiumhalogen.com/sitemap.xmllll", httpsParams)
    .then(() => false);
  expect(testBadSitemap).toBeFalsy();
});

test("checkLinks() checks for 404s", async () => {
  const catchFn = jest.fn();
  const thenFn = jest.fn();

  mockAxios.get.mockImplementationOnce(() => Promise.resolve(true));
  const testLinks = await tests
    .checkLinks(["sodiumhalogen.com", "alygn.com"], "sodiumhalogen.com")
    .then(thenFn)
    .catch(catchFn);
  expect(mockAxios.get).toHaveBeenCalledTimes(2);
  // expect(mockAxios.get).toHaveBeenCalledWith("sodiumhalogen.com", httpsParams);
  // expect(mockAxios.get).toHaveBeenCalledWith("alygn.com", httpsParams);
});

test("checkGoogleCache() checks for Google Cache", async () => {
  const hasGoogleCache = await tests.checkGoogleCache(
    "<span>This is Google's cache of "
  );
  expect(hasGoogleCache).toBeTruthy();

  const hasNoGoogleCache = await tests.checkGoogleCache(shHtml);
  expect(hasNoGoogleCache).toBeFalsy();
});

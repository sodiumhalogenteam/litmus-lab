# Litmus Lab

[![litmus-lab npm version](https://img.shields.io/npm/v/litmus-lab.svg)](https://npmjs.org/package/litmus-lab)
[![litmus-lab npm downloads](https://img.shields.io/npm/dt/litmus-lab.svg)](https://npmjs.org/package/litmus-lab)

A site checker that tests elements of a website.

![litmus-lab example](https://sh-drop.s3.us-east-1.amazonaws.com/cs/litmus-lab-example-1.png)

## get to testing 🚀

- run \$`npx litmus-lab -s sodiumhalogen.com`
- or install globally \$`npm i -g litmus-lab`

## tests available:

- [x] sitemap exists
- [x] google analytics is added
- [x] any 404s in console? (missing files)
- [x] check for `<meta name="robots" content="nofollow" />` not present
- [x] check if the site is indexed/cached by Google
- [x] check if site is up/available
- [x] check for site redirects
- [ ] filter showing only fails

## future ideas:

- [ ] test multiple urls?
- [ ] check other pages on the site (check links/imgs) using sitemap
- [ ] add custom scripts \$`litmus-lab sodiumhalogen.com --script=./custom-tests.js`
- [ ] test monthly form submission confirmation (customer gets monthly contact form submission test)
- [ ] (custom script example) test monthly form submission confirmation (customer gets monthly contact form submission test)
- [ ] update Slack of failures \$`litmus-lab -s sodiumhalogen.com --slack HOOK_URL`
- [ ] SEO-related tests
- [ ] spell-checking
- [ ] check for invalid HTML
- [ ] STDs (site-transmited diseases, aka malware) 😝
- [ ] console errors
- [ ] add option to output JSON
- [ ] make a lambda that runs script
- [ ] build site that outputs a dashboard
- [ ] if HTTPS check SSL cert expire date
- [ ] HTTP count and suggestion if too high
- [ ] page loading speed checker
- [ ] size checker (JS, images, vodeos)

## local package testing before publish

- uninstall global version \$`npm uninstall -g litmus-lab`
- create new package \$`npm pack` to create tarbal.
- check contents of new package \$`tar -tf litmus-lab-0.5.0.tgz`
- install local copy of package \$`npm install -g ~/wip/litmus-lab/litmus-lab-0.5.0.tgz` (check path and name of tarbal)
- test \$`litmus-lab`

# Litmus Lab

[![litmus-lab npm version](https://img.shields.io/npm/v/litmus-lab.svg)](https://npmjs.org/package/litmus-lab)

A site checker that tests elements of a website.

![litmus-lab example](https://sh-drop.s3.us-east-1.amazonaws.com/cs/litmus-lab-example.png)

## get to testing 🚀

- run \$`npx litmus-lab -s sodiumhalogen.com`
- or install globally \$`npm i -g litmus-lab`

## tests available:

- [x] sitemap exists
- [x] google analytics is added
- [x] any 404s in console? (missing files)
- [ ] check for `<meta name="robots" content="nofollow" />` not present

## future ideas:

- [ ] check other pages on the site
- [ ] test multiple urls?
- [ ] add custom scripts \$`litmus-lab sodiumhalogen.com --script=./custom-tests.js`
- [ ] test monthly form submission confirmation (customer gets monthly contact form submission test)
- [ ] (custom script example) test monthly form submission confirmation (customer gets monthly contact form submission test)
- [ ] update Slack of failures \$`litmus-lab -s sodiumhalogen.com --slack HOOK_URL`

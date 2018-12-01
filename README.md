# Litmus Lab

A site checker that tests elements of your live website as needed.

## get to testing 🚀

- run \$`npx litmus-lab -s sodiumhalogen.com`
- or intall globally \$`npm i -g litmus-lab`

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

# Local Dev - Litmus-Lab

## local package testing before publish

- uninstall global version \$`npm uninstall -g litmus-lab`
- create new package \$`npm pack` to create tarbal.
- check contents of new package \$`tar -tf litmus-lab-0.5.0.tgz`
- install local copy of package \$`npm install -g ~/wip/litmus-lab/litmus-lab-0.5.0.tgz` (check path and name of tarbal)
- test \$`litmus-lab`

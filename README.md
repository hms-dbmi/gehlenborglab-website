# gehlenborglab-website [![Build Status](https://travis-ci.org/hms-dbmi/gehlenborglab-website.svg?branch=master)](https://travis-ci.org/hms-dbmi/gehlenborglab-website)

(Need to set up your own Travis/Jekyll/S3 site? See [generate-static-site](https://github.com/hms-dbmi/generate-static-site).)

The Gehlenborg Lab website uses Jekyll plugins beyond those supported by GitHub Pages.
Instead, when the master branch is updated, Travis builds `_site` and pushes it
to the appropriate S3 bucket. For local development:

```
$ gem install bundler
$ bundle install
$ npm install
$ jekyll serve &
```

(The default Ruby and NPM worked for me; If you have problems, we should pin this more precisely.)

## Workflow

For smaller edits, you can just use the editor on the github site, though it's still a good idea to save the edit to a branch.

For larger edits, check out this repo locally. Our convention for branch names is `username/description`, so it's easy to tell whose contribution it is.
Run jekyll locally to get a preview of the site.

## Trobuleshooting

If using `OS X >=10.12` you may run into errors installing `nokogiri` with the `bundle install step`.
This workaround should do the trick:
```
sudo gem install nokogiri -v '1.6.8.1' -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk/usr/include/libxml2 --use-system-libraries
```

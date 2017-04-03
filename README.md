# gehlenborglab-website [![Build Status](https://travis-ci.org/hms-dbmi/gehlenborglab-website.svg?branch=master)](https://travis-ci.org/hms-dbmi/gehlenborglab-website)

The Gehlenborg Lab website uses Jekyll plugins beyond those supported by GitHub Pages.
Instead, when the master branch is updated, Travis builds `_site` and pushes it
to the appropriate S3 bucket. For local development:

```
$ bundle install
$ npm install
$ jekyll serve &
```

(The default Ruby and NPM worked for me; If you have problems, we should pin this more precisely.)

## Trobuleshooting:

If using `OS X >=10.12` you may run into errors installing `nokogiri` with the `bundle install step`.
This workaround should do the trick:
```
sudo gem install nokogiri -v '1.6.8.1' -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk/usr/include/libxml2 --use-system-libraries
```

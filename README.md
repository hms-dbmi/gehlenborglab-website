# gehlenborglab-website [![Build Status](https://travis-ci.org/hms-dbmi/gehlenborglab-website.svg?branch=master)](https://travis-ci.org/hms-dbmi/gehlenborglab-website)

Looking for [website updating instructions](./docs/)?

(Need to set up your own Travis/Jekyll/S3 site? See [generate-static-site](https://github.com/hms-dbmi/generate-static-site).)

The Gehlenborg Lab website uses Jekyll plugins beyond those supported by GitHub Pages.
Instead, when the master branch is updated, Travis builds `_site` and pushes it
to the appropriate S3 bucket. You will need to need to have a working, up-to-date ruby environment:
You can either install `rvm` or:

- A [tweak to `.bash_profile`](https://www.michaelehead.com/2016/02/06/installing-gems-without-sudo.html) will fix permission problems with `gem install`.
- The default ruby version on MacOS is too old: I upgraded with `brew install ruby`,
and followed the post-install notes to update `PATH` in `.bash_profile`.

With Ruby fixed, then:

```
$ gem install bundler
$ bundle install
$ npm install
$ jekyll serve &
```

When Jekyll is watching the filesystem, it won't run post-processing hooks that
generate thumbnails. You can do this manually:

```
brew install imagemagick
./post-build.sh
```

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

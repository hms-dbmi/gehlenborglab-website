# gehlenborglab-website [![Build Status](https://github.com/hms-dbmi/gehlenborglab-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/hms-dbmi/gehlenborglab-website/actions)

Looking for [website updating instructions](./docs/)?

(Need to set up your own Jekyll/S3 site? See [generate-static-site](https://github.com/hms-dbmi/generate-static-site).)

The HIDIVE Lab website uses Jekyll plugins beyond those supported by GitHub Pages.
Instead, when the main branch is updated, Github Actions builds `_site` and pushes it
to the appropriate S3 bucket. You will need to need to have a working, up-to-date ruby environment.

Install `rvm` [https://rvm.io/rvm/install]. RVM should load or prompt for installation of the ruby version in .ruby_version on entry to the project folder.

With Ruby fixed, then:

```
$ gem install bundler -v 2.4.22
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

## Troubleshooting

If using `OS X >=10.12` you may run into errors installing `nokogiri` with the `bundle install step`.
This workaround should do the trick:
```
sudo gem install nokogiri -v '1.6.8.1' -- --with-xml2-include=/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.12.sdk/usr/include/libxml2 --use-system-libraries
```

## Automations

The `scripts/` folder contains TypeScript automations for managing website
content (e.g., creating or updating a publication). These scripts run via
GitHub Actions in response to events like issue submissions.

For example, submitting
[./.github/ISSUE_TEMPLATE/new-member.yml](./.github/ISSUE_TEMPLATE/new-member.yml):

- Triggers [`./.github/workflows/add-lab-member.yml`](./.github/workflows/add-lab-member.yml)
- Calls [./scripts/create-hidive-member.ts](./scripts/create-hidive-member.ts)

These scripts require [Deno](https://deno.land) but rarely need editing. Our CI
enforces type checking, formatting, and linting.

```sh
cd scripts
deno fmt
deno lint
deno check .
```

Verify any changes to these scripts pass these checks.

For more information about these automations, please see the [guide](https://hms-dbmi.atlassian.net/wiki/spaces/GL/pages/3648880650/Maintaining+the+Lab+Preprint+and+Publication+Database)
on Confluence.

# gehlenborglab-website [![Build Status](https://github.com/hms-dbmi/gehlenborglab-website/actions/workflows/deploy.yml/badge.svg)](https://github.com/hms-dbmi/gehlenborglab-website/actions)

Looking for [website updating instructions](./docs/)?

(Need to set up your own Jekyll/S3 site? See [generate-static-site](https://github.com/hms-dbmi/generate-static-site).)

The HIDIVE Lab website uses Jekyll plugins beyond those supported by GitHub Pages.
Instead, when the main branch is updated, Github Actions builds `_site` and pushes it
to the appropriate S3 bucket.

The easiest way to preview the site locally is with Docker:

```
$ docker build -t hidivelab-site .
$ docker run --rm -it -p 4000:4000 -u "$(id -u):$(id -g)" -v "$PWD":/site -v /site/node_modules hidivelab-site
```

Then open http://localhost:4000. `-v /site/node_modules` keeps the image's npm packages visible under the mounted repo. Rebuild the image after `Gemfile.lock` or `package-lock.json` changes.

Alternatively, install Ruby natively. Install `rvm` [https://rvm.io/rvm/install]. RVM should load or prompt for installation of the ruby version in .ruby-version on entry to the project folder.

With Ruby fixed, then:

```
$ bundle install
$ npm install
$ bundle exec jekyll serve &
```

After every build, including each rebuild under `jekyll serve`, `_plugins/post.rb`
runs `./post-build.sh`, which copies the USWDS assets from `node_modules` and
generates thumbnails. It needs ImageMagick (`brew install imagemagick`). The hook
hides errors, so if thumbnails or the nav menus are missing, run `./post-build.sh`
by hand to see why.

## Workflow

For smaller edits, you can just use the editor on the github site, though it's still a good idea to save the edit to a branch.

For larger edits, check out this repo locally. Our convention for branch names is `username/description`, so it's easy to tell whose contribution it is.
Run jekyll locally to get a preview of the site.

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

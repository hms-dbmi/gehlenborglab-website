# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Jekyll site for the HIDIVE Lab (hidivelab.org). It uses Jekyll plugins that GitHub Pages does not support, so GitHub Actions builds `_site` and syncs it to S3 / CloudFront on push to `main` (`.github/workflows/deploy.yml`). Contributor-facing editing docs are in `docs/`.

## Commands

Site: Ruby 3.4 (from `.ruby-version`), Jekyll 4.4, and USWDS 2 from npm (`uswds@2.14.0`). There is no theme gem. Docker is the easiest route. The `Dockerfile` duplicates the Ruby version, so bump both together:

```sh
docker build -t hidivelab-site .
docker run --rm -it -p 4000:4000 -u "$(id -u):$(id -g)" -v "$PWD":/site -v /site/node_modules hidivelab-site
# or natively:
bundle install && npm install
bundle exec jekyll serve
```

The Gemfile pins are deliberate. `jekyll-sass-converter ~> 2.2` keeps libsass, because 3.x moves to Dart Sass, which deprecates the `@import` that USWDS 2 uses. `html-proofer ~> 3.19` keeps the CI flags valid.

Full CI check (there is no test suite; this is the validation):

```sh
bundle exec jekyll build
grep -n '<ERROR' -r _site    # must print nothing
bundle exec htmlproofer --alt-ignore '/.*/' --check-html --disable-external --assume-extension ./_site
```

`_plugins/post.rb` runs `./post-build.sh` after each site write. That script copies `node_modules/uswds/dist/{fonts,img,js}` into `_site/assets/uswds/`. It then uses ImageMagick `convert` to generate thumbnails in `_site/assets/img/{publications,members}/thumbnail/`. It also runs on every `jekyll serve` rebuild (about 30s, mostly thumbnails). The hook discards the script's output and exit status, so run `./post-build.sh` by hand to debug missing thumbnails or USWDS assets.

Deno automation scripts (CI runs these three checks from inside `scripts/`):

```sh
cd scripts
deno fmt        # CI uses: deno fmt --check
deno lint
deno check .
```

Run a single script locally. Each script reads issue-form JSON from a file, or from stdin with `-`:

```sh
deno run -A scripts/update-hidive-paper.ts paper.json
deno run -A scripts/fetch-hidive-zotero-items.ts --outdir=assets/papers --issue-file=missing-papers.md
```

## Architecture

### Content collections

Content lives in Jekyll collections defined in `_config.yml`. Each collection has a default layout in `_layouts/` and its own permalink scheme:

| Collection | URL | Notes |
|---|---|---|
| `_members` | `/team/members/<slug>/` | `role` field (student, postdoc, staff, alumni, ...). `_members/template.md` is excluded from the build. |
| `_publications` | `/publications/<slug>/` | `type: preprint` is listed separately from published papers, which are grouped by `year`. |
| `_projects` | `/research/projects/<slug>/` | |
| `_themes` | `/research/<slug>/` | |
| `_news` | `/news/<slug>/` | Filenames are `YYYY-MM-DD-title.md`. |
| `_positions` | `/team/positions/<slug>/` | |
| `_teams` | `/research/teams/<slug>/` | Team microsites. The sidebar subpages are in `_data/teams.yml`. |

Top-level `*.md` pages (`members.md`, `publications.md`, and so on) are index pages that loop over these collections.

### Cross-references by slug and the `<ERROR` build check

Front matter links entities by slug (the filename without `.md`). Examples: `members: [nils-gehlenborg]`, `publications: [kerpedjiev-2018-genome-biology]`, and `projects`, `collaborators`, `grants`. The `_includes/list-*.html` templates resolve each slug by building the expected URL and matching it against the collection. Collaborators come from `_data/collaborators.yml` and grants come from `_data/grants.yml`, keyed by slug.

When a slug does not resolve, the include renders a literal `<ERROR ...>` tag instead of failing. CI greps `_site` for `<ERROR` and fails the build if it finds one. A renamed member or publication file therefore breaks every page that references the old slug. Repo-root files that are not pages (such as this one) must be listed under `exclude` in `_config.yml`, or Jekyll publishes them.

### Styling (USWDS 2)

The site's own layouts and includes are the whole template layer: `_layouts/default.html` → `home.html` → `page.html` → per-collection layouts. They use USWDS 2 markup (`grid-container`, `grid-row grid-gap`, `tablet:grid-col-*`, and `usa-*__element` names). `assets/main.scss` imports `_sass/_uswds-theme.scss`, which holds the USWDS settings, then imports USWDS from `node_modules`.

The site was built on USWDS 1. The first block of `main.scss` restores the USWDS 1 rules its look depends on: global element typography, 1040px containers, section spacing and first/last-child margin resets. Changes there move every page. Compare screenshots before and after.

`$theme-utility-breakpoints` only enables `tablet`. Using a `desktop:` or `mobile-lg:` utility class requires enabling that breakpoint.

### Images

Images are referenced by bare filename in front matter. Store them in these folders:

- Publications: `image:` resolves to `assets/img/publications/fullsize/`.
- Members: `photo:` resolves to `assets/img/members/fullsize/`.

Do not commit thumbnails. `post-build.sh` generates them. Give each image alt text (`image-alt:` for publications, `alt:` for members).

### Issue-driven automation (`scripts/`, Deno + TypeScript)

GitHub issue forms in `.github/ISSUE_TEMPLATE/` apply a label. The matching workflow parses the issue into JSON, pipes it to a script, and opens a PR:

- `paper-bot`: `update-hidive-paper.ts` creates or updates `_publications/<lastname>-<year>-<slug or zotero-key>.md` from the HIDIVE Zotero group. It also downloads the image.
- `members-bot`: `create-hidive-member.ts` creates a file in `_members/`.
- `news-bot`: `create-hidive-news.ts` creates a file in `_news/`.
- Weekly cron (`fetch-papers.yml`): `fetch-hidive-zotero-items.ts` writes `assets/papers/{pubs,preprints}.csv`. It also opens or updates a "Missing HIDIVE Papers" issue. A paper counts as present when a `_publications` file has a matching `zotero-key`.

`fetch-hidive-zotero-items.ts` exports the shared Zotero schema (zod), the `LabPaperData` front matter type, and helpers that `update-hidive-paper.ts` imports. Dependencies are pinned in `scripts/deno.json` (`lock: false`). The scripts use `let` everywhere, and the `prefer-const` lint rule is disabled.

## Conventions

- Branch names use the format `username/description`.
- Publication front matter shape (`cite.authors`, `cite.published`, `zotero-key`, `videos`, `other-resources`, `awards`) is defined by `LabPaperData`. Keep hand edits consistent with it, because the bot rewrites these files.

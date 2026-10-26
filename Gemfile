source "https://rubygems.org"

# Hello! This is where you manage which Jekyll version is used to run.
# When you want to use a different version, change it below, save the
# file and run `bundle install`. Run Jekyll with `bundle exec`, like so:
#
#     bundle exec jekyll serve
#
# This will help ensure the proper Jekyll version is running.
# Happy Jekylling!
gem "jekyll", "~> 4.4"
# Stay on libsass (sassc): 3.x switches to Dart Sass, which deprecates the
# @import that USWDS 2's Sass is written with.
gem "jekyll-sass-converter", "~> 2.2"
# Required by liquid 4.x; no longer a default gem as of Ruby 3.4.
gem "bigdecimal"

# If you want to use GitHub Pages, remove the "gem "jekyll"" above and
# uncomment the line below. To upgrade, run `bundle update github-pages`.
# gem "github-pages", group: :jekyll_plugins

# If you have any plugins, put them here!
group :jekyll_plugins do
   gem "jekyll-feed", "~> 0.6"
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]

### Local additions:

# 4.x+ renamed the CLI flags used in .github/workflows/deploy.yml.
gem "html-proofer", "~> 3.19"

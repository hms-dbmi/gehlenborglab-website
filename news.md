---
layout: docs
title: News
permalink: /news/
---
## News
{% for news in site.news %}
#### [{{ news.date | date: "%B %-d, %Y" }}: {{ news.title }}]({{news.url}})
{{ news.blurb }}
{% endfor %}
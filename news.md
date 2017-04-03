---
layout: docs
title: News
permalink: /news/
---
## News
{% assign reversed = site.news | reverse %}
{% for news in reversed %}
#### [{{ news.date | date: "%B %-d, %Y" }}: {{ news.title }}]({{news.url}})
{{ news.blurb }}
{% endfor %}
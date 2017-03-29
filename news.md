---
layout: docs
title: News
permalink: /news/
---
## News
{% for news in site.news %}
- [{{ news.title }}]({{news.url}})
{% endfor %}
---
layout: docs
title: Research Projects
permalink: /research/projects/
---
## Research Projects
{% for project in site.projects %}
- [{{ project.name }}]({{project.url}})
{% endfor %}
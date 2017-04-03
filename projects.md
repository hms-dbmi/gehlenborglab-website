---
layout: docs
title: Research Projects
permalink: /research/projects/
---
## Research Projects
{% for project in site.projects %}
#### [{{ project.name }}]({{ project.url }})
{% if project.blurb %}
  {{ project.blurb }}
{% else %}
  {{ project.content }}
{% endif %}
{% endfor %}
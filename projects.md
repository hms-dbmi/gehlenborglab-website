---
layout: docs
title: Research Projects
permalink: /research/projects/
---
## Research Projects

<p class="usa-font-lead">The following list is a sample of research projects that the lab is involved in.</p>

{% for project in site.projects %}
#### [{{ project.name }}]({{ project.url }})
{% if project.blurb %}
  {{ project.blurb }}
{% else %}
  {{ project.content }}
{% endif %}
{% endfor %}
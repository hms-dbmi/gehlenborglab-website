---
layout: docs
title: Research Themes
permalink: /research/themes/
---
## Research Themes

{% for theme in site.themes %}
### {{ theme.name }}
{{ theme.content }}
{% if theme.projects.size > 0 %}
<h6>Projects</h6>
<ul>
{% for project in theme.projects %}
{% for site_project in site.projects %}
{% assign site_project_id = site_project.url | split: '/' | last %}
{% if site_project_id == project %}
<li><a href="{{ site_project.url }}">{{ site_project.name }}</a></li>
{% endif %}
{% endfor %}
{% endfor %}
</ul>
{% endif %}
{% endfor %}

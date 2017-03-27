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
<h6>Projects</h6>{% for project in theme.projects %}{% for project_details in site.projects %}{% if project_details.identifier == project %}<a href="{{ project_details.url }}">{{ project_details.name }}</a>{% endif %}{% endfor %}{% if forloop.last == false %}, {% endif %}{% endfor %}
{% endif %}
{% endfor %}
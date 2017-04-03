---
layout: docs
title: Research Projects
permalink: /research/projects/
---
## Research Projects
{% for project in site.projects %}
<div class="usa-width-one-third">
<img src="/assets/img/members/placeholder.png">
<h4><a href="{{ project.url }}">{{ project.name }}</a></h4>
{% if project.blurb %}
  {{ project.blurb }}
{% else %}
  {{ project.content }}
{% endif %}
</div>
{% endfor %}
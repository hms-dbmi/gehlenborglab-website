---
layout: page
title: Research Projects
permalink: /research/projects/
---
## Research Projects

<p class="usa-font-lead">The following list is a sample of research projects that the lab is involved in.</p>


<h3>Active</h3>
<table class="projects">

{% for project in site.projects %}
{% if project.active %}
<tr>
<td>
{% if project.gallery.size > 0 %}
<a href="{{project.url}}"><img class="thumb"
            src="/assets/img/publications/thumbnail/{{ project.gallery.first[0] }}"
            alt="{{ project.gallery.first[1] }}"></a>
{% endif %}
</td>
<td markdown="1">
#### [{{ project.name }}]({{ project.url }})
{% if project.blurb %}
  {{ project.blurb }}
{% else %}
  {{ project.content }}
{% endif %}
</td>
</tr>
{% endif %}
{% endfor %}

</table>


<h3>Inactive</h3>
<table class="projects">

{% for project in site.projects %}
{% if project.active != true %}
<tr>
<td class="display-lg-only">
{% if project.gallery.size > 0 %}
<a href="{{project.url}}"><img class="thumb"
            src="/assets/img/publications/thumbnail/{{ project.gallery.first[0] }}"
            alt="{{ project.gallery.first[1] }}"></a>
{% endif %}
</td>
<td  markdown="1">
#### [{{ project.name }}]({{ project.url }})
{% if project.blurb %}
  {{ project.blurb }}
{% else %}
  {{ project.content }}
{% endif %}
<div class="icons-row">
{% for website in project.websites %}
{% if website.primary %}
  <a href="{{ website.url }}"><div><img src="/assets/img/services/home.svg" alt="{{project.name}} website"></div></a>
{% endif %}
{% endfor %}
{% for repo in project.github_repositories %}
{% if repo.primary %}
  <a href="{{ repo.url }}"><div><img src="/assets/img/services/github.svg" alt="{{project.name}} repository"></div></a>
{% endif %}
{% endfor %}
</div>
</td>
</tr>
{% endif %}
{% endfor %}
</table>

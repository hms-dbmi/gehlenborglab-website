---
layout: page
title: Research Themes
permalink: /research/teams/
---
# Research Themes

<p class="usa-font-lead">
The following list is a list of the lab's research themes.
</p>


<h3>Active</h3>
<table class="projects">

{% for team in site.teams %}
{% if team.active and team.team_home %}
<tr>
<td>
{% if team.gallery.size > 0 %}
<a href="{{team.url}}"><img class="thumb"
            src="/assets/img/publications/thumbnail/{{ team.gallery.first[0] }}"
            alt="{{ team.gallery.first[1] }}"></a>
{% endif %}
</td>
<td markdown="1">
#### [{{ team.name }}]({{ team.url }})
{% if team.blurb %}
  {{ team.blurb }}
{% else %}
  {{ team.content }}
{% endif %}
</td>
</tr>
{% endif %}
{% endfor %}

</table>


<h3>Inactive</h3>
<table class="projects">

{% for team in site.teams %}
{% if team.active != true and team.team_home%}
<tr>
<td class="display-lg-only">
{% if team.gallery.size > 0 %}
<a href="{{team.url}}"><img class="thumb"
            src="/assets/img/publications/thumbnail/{{ team.gallery.first[0] }}"
            alt="{{ team.gallery.first[1] }}"></a>
{% endif %}
</td>
<td  markdown="1">
#### [{{ team.name }}]({{ team.url }})
{% if team.blurb %}
  {{ team.blurb }}
{% else %}
  {{ team.content }}
{% endif %}
<div class="icons-row">
{% for website in team.websites %}
{% if website.primary %}
  <a href="{{ website.url }}"><div><img src="/assets/img/services/home.svg" alt="{{team.name}} website"></div></a>
{% endif %}
{% endfor %}
{% for repo in team.github_repositories %}
{% if repo.primary %}
  <a href="{{ repo.url }}"><div><img src="/assets/img/services/github.svg" alt="{{team.name}} repository"></div></a>
{% endif %}
{% endfor %}
</div>
</td>
</tr>
{% endif %}
{% endfor %}
</table>

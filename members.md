---
layout: docs
title: Team Members
permalink: /team/members/

sidenav:
  - text: Team
    href: /team/members/
subnav:
  - text: Principal Investigator
    href: '#pi'
  - text: Researchers
    href: '#postdoc'
  - text: Software Developers
    href: '#software_developer'
  - text: Students
    href: '#student'
  - text: Administration
    href: '#administration'
  - text: Alumni
    href: '#alumni'
  - text: Collaborators
    href: '#collaborators'
---
## Team

{% assign roles = 'pi:Principal Investigator/administration:Administration/postdoc:Researchers/software_developer:Software Developers/student:Students/visitor:Visitors' | split: '/' %}

{% for role in roles %}
{% assign pair = role | split: ':' %}
<div class="usa-grid-full">
<h3 id="{{pair[0]}}">{{pair[1]}}</h3>
<ul>
{% for member in site.members %}
{% if member.role == pair[0] %}
<li><a href="{{member.url}}">{{ member.title }}</a><br>{{ member.job_title }}</li>
{% endif %}
{% endfor %}
</ul>
<br>
</div>
{% endfor %}

<div class="usa-grid-full">
<h3 id="alumni">Alumni</h3>
<ul>
{% for member in site.members %}
{% if member.role == "alumni" %}
<li><a href="{{member.url}}">{{ member.title }}</a> ({{member.start}} - {{member.end}})<br>{{ member.job_title }}</li>
{% endif %}
{% endfor %}
</ul>
<br>
</div>

<div class="usa-grid-full">
<h3 id="collaborators">Collaborators</h3>
<ul>
{% for member in site.data.collaborators %}
<li><a href="{{member[1].url}}">{{ member[1].title }}</a><br>{{member[1].affiliation}}</li>
{% endfor %}
</ul>
<br>
</div>

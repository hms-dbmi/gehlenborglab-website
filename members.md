---
layout: home
title: Team Members
permalink: /team/members/

hero:
  image: /assets/img/site/hero_team.jpg

sidenav:
  - text: Team
    href: /team/members/
subnav:
  - text: Principal Investigator
    href: '#pi'
  - text: Administration
    href: '#administration'
  - text: Postdoctoral Fellows
    href: '#postdoc'
  - text: Staff
    href: '#staff'
  - text: Students
    href: '#student'
  - text: Alumni
    href: '#alumni'
  - text: Collaborators
    href: '#collaborators'
---
## Team

{% assign roles = 'pi:Principal Investigator/administration:Administration/postdoc:Postdoctoral Fellows/student:Students/staff:Staff' | split: '/' %}

{% for role in roles %}
{% assign pair = role | split: ':' %}
<h3 id="{{pair[0]}}">{{pair[1]}}</h3>
<ul>
{% for member in site.members %}
{% if member.role == pair[0] %}
<li><a href="{{member.url}}">{{ member.title }}</a><br>{{ member.job_title }}</li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}

<h3 id="alumni">Alumni</h3>
<ul>
{% for member in site.members %}
{% if member.role == "alumni" %}
<li><a href="{{member.url}}">{{ member.title }}</a> ({{member.start}} - {{member.end}})<br>{{ member.job_title }}</li>
{% endif %}
{% endfor %}
</ul>

<h3 id="collaborators">Collaborators</h3>
<ul>
{% for member in site.data.collaborators %}
<li><a href="{{member[1].url}}">{{ member[1].title }}</a><br>{{member[1].affiliation}}</li>
{% endfor %}
</ul>

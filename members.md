---
layout: docs
title: Team Members
permalink: /team/members/

sidenav:
  - text: Team
    href: /team/members/
subnav:
  - text: Principal Investigator
    href: '#principal-investigator'
  - text: Postdoctoral Fellows
    href: '#postdoctoral-fellows'
  - text: Software Developers
    href: '#software-developers'
  - text: Students
    href: '#students'
  - text: Administration
    href: '#administration'
  - text: Alumni
    href: '#alumni'
  - text: Collaborators
    href: '#collaborators'
---
## Team
<div class="usa-grid-full">
<h3 id="principal-investigator">Principal Investigator</h3>
<ul>
{% for member in site.members %}
{% if member.role == "pi" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="postdoctoral-fellows">Postdoctoral Fellows</h3>
<ul>
{% for member in site.members %}
{% if member.role == "postdoc" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="students">Students</h3>
<ul>
{% for member in site.members %}
{% if member.role == "external" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="software-developers">Software Developers</h3>
<ul>
{% for member in site.members %}
{% if member.role == "software_developer" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>


<div class="usa-grid-full">
<h3 id="visitors">Visitors</h3>
<ul>
{% for member in site.members %}
{% if member.role == "visitor" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="administration">Administration</h3>
<ul>
{% for member in site.members %}
{% if member.role == "administration" %}
<li><a href="{{member.url}}">{{ member.name }}</a> (since {{member.start}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="alumni">Alumni</h3>
<ul>
{% for member in site.members %}
{% if member.role == "alumni" %}
<li><a href="{{member.url}}">{{ member.name }}</a> ({{member.start}} - {{member.end}})<br>{{ member.title }}</li>
{% endif %}
{% endfor %}
</ul>
</div>

<div class="usa-grid-full">
<h3 id="collaborators">Collaborators</h3>
<ul>
{% for member in site.data.collaborators %}
<li><a href="{{member[1].url}}">{{ member[1].name }}</a><br>{{member[1].affiliation}}</li>
{% endfor %}
</ul>

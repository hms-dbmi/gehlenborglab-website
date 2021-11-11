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
<ul class="ul-no-bullets members-rows">
{% for member in site.members %}
{% if member.role == pair[0] %}
<li class="member-photo-item">
  <div>
    <div class="member-photo-wrapper">
      <div class="member-thumb" style="background-image: url(/assets/img/members/thumbnail/{{ member.photo }})" role="img" alt="{{member.title}}"></div>
    </div>
    <div class="member-text">
      <a href="{{member.url}}">{{ member.title }}</a>
      <p class="member-job-title">{{ member.job_title }}</p>
      <div class="icons-row">
        {% for service in member.services %}
          <a href="{{ service[1] }}"><div><img src="/assets/img/services/{{ service[0] }}.svg" alt="{{service[0]}}"></div></a>
        {% endfor %}
      </div>
    </div>
  </div>
</li>
{% endif %}
{% endfor %}
</ul>
{% endfor %}

<h3 id="alumni">Alumni</h3>
<ul class="collaborators-and-alumni-lists members-rows">
{% for member in site.members %}
{% if member.role == "alumni" %}
<li><a href="{{member.url}}">{{ member.title }}</a> ({{member.start}} - {{member.end}})<br>{{ member.job_title }}</li>
{% endif %}
{% endfor %}
</ul>

<h3 id="collaborators">Collaborators</h3>
<ul class="collaborators-and-alumni-lists members-rows">
{% for member in site.data.collaborators %}
<li><a href="{{member[1].url}}">{{ member[1].title }}</a><br>{{member[1].affiliation}}</li>
{% endfor %}
</ul>

---
layout: page
title: Funding
permalink: /research/funding/
---
# Funding

{% assign grants = "" | split: "" %}
{% for grant in site.data.grants %}
  {% assign grants = grants | push: grant[1] %}
{% endfor %}

{% assign grants = grants | sort: "start_year" | reverse %}
{% for grant in grants %}
<div class="funding">
<h2>{{grant.name}}</h2>
<h3>{{grant.funder}}</h3>
{% if grant.url %}
<a href="{{grant.url}}" class="link-title">{{grant.number}}</a>
{% else %}
<p>{{grant.number}}</p>
{% endif %}
{% if grant.start %}
<p>{{grant.start}} - {{grant.end}}</p>
{% endif %}
{% if grant.role %}
<i>Role: {{grant.role}}</i>
{% endif %}
{% endfor %}
<div>
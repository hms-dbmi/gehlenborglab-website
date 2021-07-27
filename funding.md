---
layout: page
title: Funding
permalink: /research/funding/
---
## Funding

{% for grant in site.data.grants %}
<div class="funding">
<h3>{{grant[1].name}}</h3>
<h4>{{grant[1].funder}}</h4>
{% if grant[1].url %}
<a href="{{grant[1].url}}" class="link-title">{{grant[1].number}}</a>
{% else %}
<p>{{grant[1].number}}</p>
{% endif %}
{% if grant[1].start %}
<p>{{grant[1].start}} - {{grant[1].end}}</p>
{% endif %}
{% if grant[1].role %}
<i>Role: {{grant[1].role}}</i>
{% endif %}
{% endfor %}
<div>
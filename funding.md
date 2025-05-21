---
layout: page
title: Funding
permalink: /research/funding/
---
{% assign current_month = site.time | date: "%Y%m" %}
{% assign month_map = "January:01,February:02,March:03,April:04,May:05,June:06,July:07,August:08,September:09,October:10,November:11,December:12" | split: ',' %}
{% assign month_number = month_map | where: "January:01", month_name | first | split: ':' | last %}

{% comment %}
  Collect all grants into a list
{% endcomment %}
{% assign grants = "" | split: "" %}
{% for grant in site.data.grants %}
  {% assign grants = grants | push: grant[1] %}
{% endfor %}

{% comment %}
  Separate into active and past grants using end_date
{% endcomment %}
{% assign active_grants = grants | where_exp: "grant", "grant.end_date > current_month" %}
{% assign past_grants = grants | where_exp: "grant", "grant.end_date <= current_month" %}

{% comment %}
  Sort current grants by start_year and past grants by end_date in reverse.
{% endcomment %}
{% assign active_grants = active_grants | sort: "start_year" | reverse %}
{% assign past_grants = past_grants | sort: "end_date" | reverse %}

## Current Funding
{% for grant in active_grants %}
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
<p><i>Role: {{grant.role}}</i></p>
{% endif %}
<p>{{grant.summary}}</p>
{% endfor %}
<div>

<h1>Past Funding</h1>
{% for grant in past_grants %}
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
<p><i>Role: {{grant.role}}</i></p>
{% endif %}
<p>{{grant.summary}}</p>
{% endfor %}
<div>

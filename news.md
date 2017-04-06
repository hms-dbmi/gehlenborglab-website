---
layout: docs
title: News
permalink: /news/
---
## News

<div class="usa-grid-full">
  <div class="usa-width-one-third">
  <h3>2017</h3>
  </div>
  <div class="usa-width-two-thirds">
  {% assign latest_news = site.news | reverse | slice: 0,5 %}
  {% for news in latest_news %}
    <h3>{{ news.title }}</h3>
      <p>
        <b>{{ news.date | date: "%-d %B %Y" }}</b> | 
        {{ news.blurb }} <a href="{{news.url}}">More ...</a>
      </p>
  {% endfor %}
  </div>
</div>

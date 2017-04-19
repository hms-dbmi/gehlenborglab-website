---
layout: docs
title: News
permalink: /news/
---
## News

{% assign latest_news = site.news | reverse | slice: 0,5 %}
{% assign this_year = latest_news[0].date | date: "%Y" %}
{% assign last_year = this_year | minus: 1 %}
{% assign years = this_year | append: ';' | append: last_year | split: ';' %}

{% for year in years %}
  {% capture news %}
        {% for news in latest_news %}
        {% assign news_year = news.date | date: "%Y" %}
        {% if news_year == year %}
          <h3>{{ news.title }}</h3>
          <p>
            <b>{{ news.date | date: "%-d %B %Y" }}</b> | 
            {{ news.blurb }} <a href="{{news.url}}">More ...</a>
          </p>
        {% endif %}
      {% endfor %}
  {% endcapture %}
  
  
  <div class="usa-grid-full">
    <div class="usa-width-one-third">
      <h3>{{ year }}</h3>
    </div>
    <div class="usa-width-two-thirds">
      {{ news }}
    </div>
  </div>
{% endfor %}

---
layout: page
title: News
permalink: /news/
---
## News

{% assign latest_news = site.news | reverse %}
{% assign end_year = latest_news[0].date | date: "%Y" %}
{% assign start_year = latest_news[-1].date | date: "%Y" %}
{% assign years = (start_year..end_year) | reverse %}

{% for year in years %}
  {% capture year_string %}{{ year }}{% endcapture %}

  <div class="usa-grid-full">
    <div class="usa-width-one-third">
      <h3>{{ year }}</h3>
    </div>
    <div class="usa-width-two-thirds">

      {% for news in latest_news %}
        {% assign news_year = news.date | date: "%Y" %}
        {% if news_year == year_string %}

          <h3>{{ news.title }}</h3>
          <p>
            <b>{{ news.date | date: "%-d %B %Y" }}</b> |
            {{ news.blurb }} <a href="{{news.url}}">More ...</a>
          </p>

        {% endif %}
      {% endfor %}

      <br>
    </div>
  </div>

{% endfor %}

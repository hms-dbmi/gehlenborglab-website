---
# You don't need to edit this file, it's empty on purpose.
# Edit theme's home layout instead if you wanna make some changes
# See: https://jekyllrb.com/docs/themes/#overriding-theme-defaults
layout: home

hero:
  image: /assets/img/site/hero-gordonhall.jpg

title: HIDIVE Lab
tagline: Data visualization to drive discovery.
intro: |
  The **HIDIVE** Lab (Humans in Data Integration, Visualization, and Exploration) in the [Department of Biomedical Informatics](http://dbmi.hms.harvard.edu) at [Harvard Medical School](http://hms.harvard.edu) is conducting research at the interface of human and artificial intelligence. We create methods and tools that enable humans and machines alike to interact with and generate insights from biomedical data. In our work, we combine state-of-the-art biomedical informatics, data visualization, and AI/ML techniques across the full spectrum of biomedical data. An overview of recent publications of the lab can be found on [Google Scholar](https://scholar.google.com/citations?hl=en&user=YEcBVFAAAAAJ&view_op=list_works&sortby=pubdate).

  We value diverse viewpoints, creative thinking, and bold initiative in a highly collaborative and interdisciplinary work environment. The HIDIVE Lab has an international reputation for creating high impact data visualization tools and we are driven to solve the most challenging design and engineering problems where biomedical data, humans, and AI meet. Our work can be found on [GitHub](https://github.com/search?utf8=%E2%9C%93&q=topic%3Ahidivelab&type=Repositories).
---

# HIDIVE Lab

<div class="usa-grid-full">
  <div class="usa-width-one-third">
  <h2>Latest News</h2>
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

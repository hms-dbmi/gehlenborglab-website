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
  The **HIDIVE** Lab (Humans in Data Integration, Visualization, and Exploration) in the [Department of Biomedical Informatics](http://dbmi.hms.harvard.edu) at [Harvard Medical School](http://hms.harvard.edu) is a group of data scientists and software developers who are passionate about driving biomedical discovery by creating efficient and effective visual interfaces between analysts and data. We focus on the development of visual analysis tools for genomic and other biomedical data to address challenges in basic and applied research. We are particularly interested in applying our approaches in cancer genomics, epigenomics, and chromosome conformation studies. 

  The most recent results of our work can always be found on [bioRxiv](http://biorxiv.org/search/author1%3ANils%2BGehlenborg), [medRxiv](https://www.medrxiv.org/search/author1:Nils+Gehlenborg), [arXiv](https://arxiv.org/search/?query=gehlenborg&searchtype=author&source=header), [osf Preprints](https://osf.io/search?q=gehlenborg&resourceType=Preprint&sort=-dateModified), and on [GitHub](https://github.com/search?utf8=%E2%9C%93&q=topic%3Ahidivelab&type=Repositories).
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

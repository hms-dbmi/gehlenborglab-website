---
layout: page
title: Publications
permalink: /publications/
---

<h1>Publications</h1>

<table class="publications">

{% assign sorted = site.publications | sort: 'year' | reverse %}

{% for publication in sorted %}

    {% if publication.year != prev_year %}
      <tr><td colspan="2">
        <h2>{{ publication.year }}</h2>
      </td></tr>
    {% endif %}

    {% assign prev_year = publication.year %}
    {% include publication-row.html %}

{% endfor %}

</table>

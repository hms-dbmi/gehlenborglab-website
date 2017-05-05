---
layout: docs
title: Publications
permalink: /publications/
---

<table class="publications">

<tr><td colspan="2">
  <h2>Preprints</h2>
</td></tr>

{% for publication in site.publications %}
  {% if publication.type == 'preprint' %}
    {% include publication-row.html %}
  {% endif %}
{% endfor %}

{% assign sorted = site.publications | sort: 'year' | reverse %}
{% for publication in sorted %}
  {% if publication.type != 'preprint' %}
  
    {% if publication.year != prev_year %}
      <tr><td colspan="2">
        <h2>{{ publication.year }}</h2>
      </td></tr>
    {% endif %}

    {% assign prev_year = publication.year %}
    {% include publication-row.html %}

  {% endif %}
{% endfor %}

</table>
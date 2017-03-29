---
layout: docs
title: Publications
permalink: /publications/
---

{% assign sorted = site.publications | sort: 'year' %}
{% for publication in sorted %}
{% if publication.year != prev_year %}
{% if publication.year == 0 %}
## Preprints
{% else %}
## {{ publication.year }}
{% endif %}
{% endif %}
{% assign prev_year = publication.year %}
{{ publication.citation }}
[Details]({{publication.url}})
{% endfor %}

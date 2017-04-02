---
layout: docs
title: Publications
permalink: /publications/
---

## Preprints
{% for publication in site.publications %}
{% if publication.type == 'preprint' %}
{{ publication.citation }}
[Details]({{publication.url}})
{% endif %}
{% endfor %}

{% assign sorted = site.publications | sort: 'year' | reverse %}
{% for publication in sorted %}
{% if publication.type != 'preprint' %}
{% if publication.year != prev_year %}
## {{ publication.year }}
{% endif %}
{% assign prev_year = publication.year %}
{{ publication.citation }}
[Details]({{publication.url}})
{% endif %}
{% endfor %}

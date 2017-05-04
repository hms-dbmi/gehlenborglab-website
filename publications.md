---
layout: docs
title: Publications
permalink: /publications/
---

## Preprints
{% for publication in site.publications %}
{% if publication.type == 'preprint' %}

{% if publication.image %}<img class="thumb" src="/assets/img/publications/thumbnail/{{ publication.image }}">{% endif %}
{{ publication.cite.authors }}.
“[{{ publication.title }}]({{publication.url}})”
{{ publication.cite.published }}
({{ publication.year }})

{% endif %}
{% endfor %}

{% assign sorted = site.publications | sort: 'year' | reverse %}
{% for publication in sorted %}
{% if publication.type != 'preprint' %}
{% if publication.year != prev_year %}
## {{ publication.year }}
{% endif %}
{% assign prev_year = publication.year %}

{{ publication.cite.authors }}.
“[{{ publication.title }}]({{publication.url}})”
{{ publication.cite.published }}
({{ publication.year }})

{% endif %}
{% endfor %}

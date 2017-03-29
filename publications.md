---
layout: docs
title: Publications
permalink: /publications/
---

{% for publication in site.publications %}
##### [{{ publication.name }}]({{publication.url}})
{% endfor %}
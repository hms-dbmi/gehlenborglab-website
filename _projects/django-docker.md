---
name: django-docker-engine
active: true

members:
  - chuck-mccallum
  - scott-ouellette
  - nils-gehlenborg

github_repositories:
  - name: django-docker-engine
    description:
    url: https://github.com/refinery-platform/django_docker_engine
    primary: true

gallery:
  django-docker.png: 'Components of django_docker_engine'

blurb:
  - django-docker-engine is a Django app that manages the creation of, and proxies requests to, Docker containers. 
---
Visualization tools have been built with a range of languages and they may have numerous, and possibly conflicting, dependencies. For the [Refinery Platform](http://refinery-platform.org), a data management, analysis, and visualization system for bioinformatics and computational biology applications, we have tried to accommodate the widest range of tools by creating django_docker_engine, a Python package, available on PyPI, which launches Docker containers, proxies requests from Django to the containers, and records each request.

For each tool the wrapping Docker container will parse the input data provided on launch and start listening for requests. Currently, wrappers are in use for pure JavaScript applications, and for client-server applications, such as [HiGlass](http://higlass.io) for exploring genomic contact matrices, and a [Plotly Dash tool](https://github.com/refinery-platform/heatmap-scatter-dash) for gene expression data. The containers themselves may run on the same host as Django, or on separate instances. 

In the Refinery Platform, interactive visualizations managed by django_docker_engine complement workflows managed by Galaxy: Both tools lower barriers to entry and make it possible for end users to run sophisticated analyses on their own data. Refinery adds user management, access control, and provenance tracking facilities to make research more reproducible.

This approach will be useful in any environment which needs to provide access to pre-existing or independently developed tools from within a Django application with responsibility for user authentication, access control, and data management.


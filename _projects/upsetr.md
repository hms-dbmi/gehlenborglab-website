---
layout: project

name: UpSetR
identifier: upsetr

members:
  - jake_conway
  - megan_paul
  - nils_gehlenborg

collaborators:
  - alexander_lex

websites:
  - name: UpSetR R Package
    description: 
    url: https://CRAN.R-project.org/package=UpSetR
  - name: UpSetR Shiny App
    description: A web-based app to generate basic UpSetR plots.
    url: https://gehlenborglab.shinyapps.io/upsetr/

github_repositories:
  - name: UpSetR
    description:
    url: https://github.com/hms-dbmi/UpSetR/
  - name: UpSetR Shiny App
    description:
    url: https://github.com/hms-dbmi/UpSetR-shiny/

docker_repositories:

grants:
  - nih_k99hg007583
  - nih_r00hg007583

---
UpSetR is an R package to generate static UpSet plots. The UpSet technique visualizes set intersections in a matrix layout and introduces aggregates based on groupings and queries. The matrix layout enables the effective representation of associated data, such as the number of elements in the aggregates and intersections, as well as additional summary statistics derived from subset or element attributes.
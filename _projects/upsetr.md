---
name: UpSetR
active: true

members:
  - jake-conway
  - megan-paul
  - nils-gehlenborg

collaborators:
  - alexander-lex

publications:
  - conway-2017-biorxiv

websites:
  - name: UpSetR R Package
    description: 
    url: https://CRAN.R-project.org/package=UpSetR
    primary: true
  - name: UpSetR Shiny App
    description: A web-based app to generate basic UpSetR plots.
    url: https://gehlenborglab.shinyapps.io/upsetr/

gallery:
  upsetr.png: Screenshot
  
github_repositories:
  - name: UpSetR
    description:
    url: https://github.com/hms-dbmi/UpSetR/
    primary: true
  - name: UpSetR Shiny App
    description:
    url: https://github.com/hms-dbmi/UpSetR-shiny/

docker_repositories:

grants:
  - nih_k99hg007583
  - nih_r00hg007583

blurb: An R package to generate static UpSet plots.
---
UpSetR is an R package to generate static UpSet plots. The UpSet technique visualizes set intersections in a matrix layout and introduces aggregates based on groupings and queries. The matrix layout enables the effective representation of associated data, such as the number of elements in the aggregates and intersections, as well as additional summary statistics derived from subset or element attributes.
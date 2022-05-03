---
name: HiPiler
active: true

members:
  - fritz-lekschas
  - peter-kerpedjiev
  - nils-gehlenborg

collaborators:
  - hanspeter-pfister

publications:
  - lekschas-2017-biorxiv

websites:
  - name: HiPiler Demo
    url: http://hipiler.higlass.io/
    primary: true

github_repositories:
  - name: HiPiler Application
    description:
    url: https://github.com/flekschas/hipiler
    primary: true
  - name: Clodius
    description: A tool to tile 1D and 2D genomic data sets for use with HiGlass and HiPiler.
    url: https://github.com/hms-dbmi/clodius

gallery:
  hipiler.png: Screenshot

docker_repositories:

grants:
  - nih_u01ca200059
  - nih_r00hg007583

blurb: HiPiler is an interactive visualization interface for the exploration and visualization of regions-of-interest such as loops in large genome interaction matrices.
---
HiPiler is an interactive visualization interface for the exploration and visualization of regions-of-interest such as loops in large genome interaction matrices. Genome interaction matrices approximate the physical distance of pairs of genomic regions to each other and can contain up to 3 million rows and columns with many sparse regions. Traditional matrix aggregation or pan-and-zoom interfaces largely fail in supporting search, inspection, and comparison of local regions-of-interest (ROIs). ROIs can be defined, e.g., by sets of adjacent rows and columns, or by specific visual patterns in the matrix. ROIs are first-class objects in HiPiler, which represents them as thumbnail-like “snippets”. Snippets can be laid out automatically based on their data and meta attributes. They are linked back to the matrix and can be explored interactively. The design of HiPiler is based on a series of semi-structured interviews with 10 domain experts involved in the analysis and interpretation of genome interaction matrices. We describe six exploration tasks that are crucial for analysis of interaction matrices and demonstrate how HiPiler supports these tasks. We report on a user study with a series of data exploration sessions with domain experts to assess the usability of HiPiler as well as to demonstrate respective findings in the data.

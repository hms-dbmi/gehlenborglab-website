---
name: OncoThreads

members:
  - sabrina-nusrat
  - theresa-harbig
  - nils-gehlenborg  
  
collaborators:
  - ethan-cerami

websites:
  - name: Demo
    url: http://onco-app.s3-website-us-east-1.amazonaws.com/

github_repositories:
  - name: OncoThreads
    description: Repository for the current version of OncoThreads
    url: https://github.com/hms-dbmi/OncoThreads

docker_repositories:

grants:

blurb: "OncoThreads is a visualization tool for longitudinal cancer genomics data."
---
OncoThreads is a web-based visualization tool for the interactive exploration of tumor evolution designed to aid researchers in visualizing and exploring temporal patterns within a single patient and across an entire patient cohort. OncoThreads allows researchers find patterns such as effect of treatments, find correlation with treatments and mutation counts, and compare the results across patient cohorts. Our visualization approach is based on heterogeneous heatmaps representing patient samples (columns) at different timepoints (blocks). Within each timepoint and treatment block, samples can be grouped to show proportions of patients with a particular attribute value. With this grouping, the heatmap is transformed iteratively to a Sankey diagram, a special type of flow diagram. We present the first prototype of our implementation in BioVis ‘18 poster and talk. We use ReactJS, and d3 as our development tools.

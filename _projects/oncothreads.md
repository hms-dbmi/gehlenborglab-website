---
name: OncoThreads
active: true

members:
  - sabrina-nusrat
  - theresa-harbig
  - qianwen-wang
  - nils-gehlenborg  
  
collaborators:
  - ethan-cerami

websites:
  - name: Demo
    url: http://oncothreads.gehlenborglab.org/
    primary: true

github_repositories:
  - name: OncoThreads
    description: Repository for the current version of OncoThreads
    url: https://github.com/hms-dbmi/OncoThreads
    primary: true

docker_repositories:

publications:
  - harbig-2021-osf
  - wang-2021-threadstates

grants:

gallery:
  OncoThreads-default.png: 'Longitudinal data visualization of samples taken in different timepoints.'
  OncoThreads-global.png: 'Global view of actual timeline of samples and treatments for each patient.'
  OncoThreads-group.png: 'Within each timepoint and treatment block, samples can be grouped to show proportions of patients with a particular attribute value.'

  

blurb: "OncoThreads is a visualization tool for longitudinal cancer genomics data."
---
OncoThreads is a web-based visualization tool for the interactive exploration of tumor evolution designed to aid researchers in visualizing and exploring temporal patterns within a single patient and across an entire patient cohort. OncoThreads allows researchers find patterns such as effect of treatments, find correlation with treatments and mutation counts, and compare the results across patient cohorts. Our visualization approach is based on heterogeneous heatmaps representing patient samples (columns) at different timepoints (blocks). Within each timepoint and treatment block, samples can be grouped to show proportions of patients with a particular attribute value. With this grouping, the heatmap is transformed iteratively to a Sankey diagram, a special type of flow diagram. We present the first prototype of our implementation in BioVis ‘18 poster and talk. We use ReactJS, and d3 as our development tools.

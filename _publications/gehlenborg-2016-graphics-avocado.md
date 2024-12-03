---
title: "AVOCADO: Visualization of Workflow-Derived Data Provenance for Reproducible Biomedical Research"
image: avocado.png
image-alt: A provenance graph that visually represents the workflow and analysis process for a data-driven project. It shows various nodes, such as datasets, analyses, and workflow instances, connected by edges that depict the relationships and data flow between them. 

members:
  - nils-gehlenborg
type: article
year: 2016
publisher: "https://onlinelibrary.wiley.com/doi/10.1111/cgf.12924"
doi: "10.1111/cgf.12924"
zotero-key: "Z34HREWP"
cite:
  authors: "H Stitz, S Luger, M Streit, N Gehlenborg"
  published: "*Computer Graphics Forum* **35**(3):481-490"
---
A major challenge in data-driven biomedical research lies in the collection and representation of data provenance information to ensure that findings are reproducibile. In order to communicate and reproduce multi-step analysis workflows executed on datasets that contain data for dozens or hundreds of samples, it is crucial to be able to visualize the provenance graph at different levels of aggregation. Most existing approaches are based on node-link diagrams, which do not scale to the complexity of typical data provenance graphs. In our proposed approach, we reduce the complexity of the graph using hierarchical and motif-based aggregation. Based on user action and graph attributes, a modular degree-of-interest (DoI) function is applied to expand parts of the graph that are relevant to the user. This interest-driven adaptive approach to provenance visualization allows users to review and communicate complex multi-step analyses, which can be based on hundreds of files that are processed by numerous workflows. We have integrated our approach into an analysis platform that captures extensive data provenance information, and demonstrate its effectiveness by means of a biomedical usage scenario.
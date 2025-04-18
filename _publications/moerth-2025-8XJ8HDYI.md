---
title: 'Nexus: Interactive Visual Exploration of 3D Spatial Connectivity for Tissue Analysis'
image: moerth-2025-8XJ8HDYI.png
image-alt: >-
  Nexus provides a multi-scale visualization of connectivity to support tissue analysis by integrating spatial and
  network-based

  perspectives. The left side of the panel presents a 3D segmentation of glomeruli and their associated nerve
  structures, with colors indicating the degree of neighborhood connectivity.  The top-right side of the panel
  represents the connectivity graph, abstracting nerve-glomeruli interactions into a node-link representation. The
  bottom-right panel shows an ego network, focusing on a selected glomerulus (indicated with green across views) to
  reveal its local and extended connectivity within the neural landscape.
members:
  - nils-gehlenborg
  - eric-moerth
year: 2025
type: preprint
publisher: 'https://osf.io/nypmf_v1'
doi: 10.31219/osf.io/nypmf_v1
cite:
  authors: 'E Moerth, B Beinder, R Raidou, N Gehlenborg'
  published: '*OSF Preprints*'
zotero-key: 8XJ8HDYI
videos: []
other-resources: []
awards: []
---
We introduce Nexus (Network-based EXploration and Connectivity Analysis for Understanding Spatial Tissue Organization), a method designed to provide a unified network exploration interface for the analysis of connectivity derived from high-resolution three-dimensional (3D) tissue imaging. Advancements in imaging technologies have revolutionized our ability to map the human bodyat unprecedented levels of detail, enabling single cell-resolution imaging of functional tissue units and individual cells. This capability has significantly improved our understanding of organ function and disease progression. A key challenge remains in analyzing the connectivity between tissue structures at different scales, as they communicate through complex signaling pathways. Nexus addresses this challenge through two complementary components. The first is a computational pipeline that generates surface meshes and network-based connectivity abstractions from segmented volumetric data, incorporating a novel method for suggesting connections in incomplete tubular meshes. The second is an interactive visualization tool that synchronizes a 3D spatial view of the tissue with twoabstract network views, facilitating comprehensive visual exploration and analysis. The effectiveness of Nexus is demonstrated throughthree case studies: analyzing kidney glomeruli-nerve connectivity, investigating intraepithelial lesion interactions within pancreatic ducts,and exploring single-cell connectivity in melanoma datasets. These case studies underscore the potential of Nexus to provide deeperinsights into tissue organization and its implications for health and disease. Source code for a web-based prototype implementation ofthe proposed method will be made available upon publication.

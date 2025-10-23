---
title: Interactive visualization of kidney micro-compartmental segmentations and associated pathomics on whole slide images
image: keller-2025-U38UHYDG.png
image-alt: >-
  Figure 2 of manuscript. Top left shows a schematic of the layered spatial visualization approach in which
  segmentations of functional tissue units are displayed in multiple layers above a multi-channel image and an RGB
  histology image. Top right shows a screenshot of the visualization interface in the KPMP Kidney Tissue Atlas data
  portal website, showing a single whole-slide image and multiple FTU segmentations layered above. Bottom shows another
  screenshot, with histograms and violin/jitter plots below to display distributions of selected pathomic features.
members:
  - mark-keller
  - nils-gehlenborg
year: 2025
type: preprint
publisher: 'http://arxiv.org/abs/2510.19499'
doi: 10.48550/arXiv.2510.19499
cite:
  authors: >-
    MS Keller, N Lucarelli, Y Chen, S Border, A Janowczyk, J Himmelfarb, M Kretzler, J Hodgin, L Barisoni, D Demeke, L
    Herlitz, G Moeckel, AZ Rosenberg, Y Ding, P Sarder, N Gehlenborg
  published: '*arXiv*'
zotero-key: U38UHYDG
videos: []
other-resources: []
awards: []
---
Application of machine learning techniques enables segmentation of functional tissue units in histology whole-slide images (WSIs). We built a pipeline to apply previously validated segmentation models of kidney structures and extract quantitative features from these structures. Such quantitative analysis also requires qualitative inspection of results for quality control, exploration, and communication. We extend the Vitessce web-based visualization tool to enable visualization of segmentations of multiple types of functional tissue units, such as, glomeruli, tubules, arteries/arterioles in the kidney. Moreover, we propose a standard representation for files containing multiple segmentation bitmasks, which we define polymorphically, such that existing formats including OME-TIFF, OME-NGFF, AnnData, MuData, and SpatialData can be used. We demonstrate that these methods enable researchers and the broader public to interactively explore datasets containing multiple segmented entities and associated features, including for exploration of renal morphometry of biopsies from the Kidney Precision Medicine Project (KPMP) and the Human Biomolecular Atlas Program (HuBMAP).

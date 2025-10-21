---
title: 'GQVis: A Dataset of Genomics Data Questions and Visualizations for Generative AI'
image: walters-2025-gqvis.png
image-alt: >-
  Examples of visualizations in the GQVis dataset include interactive chromoscope visualizations, epigenetic data, and
  structural and functional data.
members:
  - skylar-walters
  - arthea-valderrama
  - thomas-smits
  - david-kouril
  - huyen-nguyen
  - sehi-lyi
  - devin-lange
  - nils-gehlenborg
year: 2025
type: article
publisher: 'http://arxiv.org/abs/2510.13816'
doi: 10.48550/arXiv.2510.13816
cite:
  authors: 'SS Walters, A Valderrama, TC Smits, D Kouřil, HN Nguyen, S L''Yi, D Lange, N Gehlenborg'
  published: '*2025 IEEE VIS Workshop on GenAI, Agents, and the Future of VIS (VISxGenAI)*'
zotero-key: PU4NLA49
videos: []
other-resources:
  - title: Hugging Face Dataset
    url: 'https://huggingface.co/datasets/HIDIVE/GQVis'
awards: []
code: 'https://github.com/hms-dbmi/GQVis-Generation'
preprint: 'https://arxiv.org/abs/2510.13816'
---
Data visualization is a fundamental tool in genomics research, enabling the exploration, interpretation, and communication of complex genomic features. While machine learning models show promise for transforming data into insightful visualizations, current models lack the training foundation for domain-specific tasks. In an effort to provide a foundational resource for genomics-focused model training, we present a framework for generating a dataset that pairs abstract, low-level questions about genomics data with corresponding visualizations. Building on prior work with statistical plots, our approach adapts to the complexity of genomics data and the specialized representations used to depict them. We further incorporate multiple linked queries and visualizations, along with justifications for design choices, figure captions, and image alt-texts for each item in the dataset. We use genomics data retrieved from three distinct genomics data repositories (4DN, ENCODE, Chromoscope) to produce GQVis: a dataset consisting of 1.14 million single-query data points, 628k query pairs, and 589k query chains. The GQVis dataset and generation code are available at https://huggingface.co/datasets/HIDIVE/GQVis and https://github.com/hms-dbmi/GQVis-Generation.

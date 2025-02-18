---
title: 'AltGosling: Automatic Generation of Text Descriptions for Accessible Genomics Data Visualization'
image: altgosling-structure.png
members:
  - thomas-smits
  - sehi-lyi
  - andrew-mar
  - nils-gehlenborg
year: 2024
type: article
publisher: 'https://academic.oup.com/bioinformatics/advance-article/doi/10.1093/bioinformatics/btae670/7900296'
doi: 10.1093/bioinformatics/btae670
zotero-key: 9X8PFMGP
cite:
  authors: 'TC Smits, S L’Yi, AP Mar, N Gehlenborg'
  published: '*Bioinformatics* btae670'
videos:
  - title: Demo
    url: 'https://gosling-lang.github.io/altgosling/'
other-resources: []
awards: []
code: 'https://github.com/gosling-lang/altgosling'
preprint: 'https://osf.io/26jvr'
---
### Motivation 
Biomedical visualizations are key to accessing biomedical knowledge and detecting new patterns in large datasets. Interactive visualizations are essential for biomedical data scientists and are omnipresent in data analysis software and data portals. Without appropriate descriptions, these visualizations are not accessible to all people with blindness and low vision, who often rely on screen reader accessibility technologies to access visual information on digital devices. Screen readers require descriptions to convey image content. However, many images lack informative descriptions due to unawareness and difficulty writing such descriptions. Describing complex and interactive visualizations, like genomics data visualizations, is even more challenging. Automatic generation of descriptions could be beneficial, yet current alt text generating models are limited to basic visualizations and cannot be used for genomics. 
             
### Results 
We present AltGosling, an automated description generation tool focused on interactive data visualizations of genome-mapped data, created with the grammar-based genomics toolkit Gosling. The logic-based algorithm of AltGosling creates various descriptions including a tree-structured navigable panel. We co-designed AltGosling with a blind screen reader user (co-author). We show that AltGosling outperforms state-of-the-art large language models and common image-based neural networks for alt text generation of genomics data visualizations. As a first of its kind in genomic research, we lay the groundwork to increase accessibility in the field. 
             
### Availability and Implementation 
The source code, examples, and interactive demo are accessible under the MIT License at https://github.com/gosling-lang/altgosling. The package is available at https://www.npmjs.com/package/altgosling. 
             
### Supplementary information 
Supplementary data are available at Bioinformatics online.

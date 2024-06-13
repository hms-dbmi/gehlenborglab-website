---
title: "AltGosling: Automatic Generation of Text Descriptions for Accessible Genomics Data Visualization"
image: altgosling-structure.png

members:
  - thomas-smits
  - sehi-lyi
  - andrew-mar
  - nils-gehlenborg

year: 2024
type: preprint

publisher: "https://osf.io/preprints/osf/26jvr"
cite:
  authors: "T C Smits, S L'Yi, A P Mar, and N Gehlenborg"
  published: "*OSF Preprints* doi:10.31219/osf.io/26jvr"
---
Biomedical visualizations are key to accessing biomedical knowledge and detecting new patterns in large datasets. Interactive visualizations are essential for biomedical data scientists and are omnipresent in data analysis software and data portals. Without appropriate descriptions, these visualizations are not accessible to all people with blindness and low vision, who often rely on screen reader accessibility technologies to access visual information on digital devices. Screen readers require descriptions to convey image content. However, many images lack informative descriptions due to unawareness and difficulty writing such descriptions. Describing complex and interactive visualizations, like genomics data visualizations, is even more challenging. Automatic generation of descriptions could be beneficial, yet current alt text generating models are limited to basic visualizations and cannot be used for genomics. 

We present AltGosling, an automated description generation tool focussed on interactive data visualizations of genome-mapped data, created with the grammar-based genomics toolkit Gosling. The logic-based algorithm of AltGosling creates various descriptions including a tree-structured navigable panel. We co-designed AltGosling with a blind screen reader user (co-author). We show that AltGosling outperforms state-of-the-art large language models and common image-based neural networks for alt text generation of genomics data visualizations. As a first of its kind in genomic research, we lay the groundwork to increase accessibility in the field. 

The source code, examples, and interactive demo are accessible under the MIT License at https://github.com/gosling-lang/altgosling. The package is available at https://www.npmjs.com/package/altgosling.
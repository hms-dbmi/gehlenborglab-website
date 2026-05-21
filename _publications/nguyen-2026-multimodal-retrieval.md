---
title: 'Geranium: Multimodal Retrieval of Genomics Data Visualizations'
image: nguyen-2026-multimodal-retrieval.png
image-alt: <TODO>
members:
  - nils-gehlenborg
  - huyen-nguyen
  - sehi-lyi
  - thomas-smits
year: 2026
type: article
publisher: 'https://ieeexplore.ieee.org/document/11480764'
doi: 10.1109/TVCG.2026.3683429
cite:
  authors: 'HN Nguyen, S L''Yi, TC Smits, S Gao, M Zitnik, N Gehlenborg'
  published: '*IEEE Transactions on Visualization and Computer Graphics*'
zotero-key: 2NUI34VT
videos:
  - title: Demo video
    url: 'https://youtu.be/XXYk3Xz73Dk'
other-resources:
  - title: Supplementary material
    url: 'https://osf.io/f4y5a/files/nkj6a'
awards: []
code: 'https://github.com/gosling-lang/geranium'
website: 'https://gosling-lang.github.io/geranium/'
preprint: 'https://osf.io/preprints/osf/zatw9'
---
Effective visualization is essential for interpreting genomics data, yet researchers often face challenges in finding relevant, reusable examples. Existing tools offer limited support for searching the vast landscape of genomics visualizations, making the process of authoring new visualizations time-consuming and inefficient. To address this gap, we introduce Geranium, a data visualization retrieval system for searching and authoring genomics visualizations. Geranium supports multimodal retrieval, enabling users to query with images, text, or grammar based specifications. Retrieved examples serve as scaffolds for authoring, providing templates that researchers can adapt with their own data, thereby streamlining the mechanics of visualization construction. Geranium integrates three embedding methods to combine specialized and general knowledge: grammar-based embeddings tailored to genomics visualizations, multimodalem beddings from a biomedical vision-language foundation model, and text embeddings from a fine-tuned large language model. For each visualization, we construct a multimodal representation that includes a Gosling specification, a pixel-based rendering, and natural language descriptions. We evaluate embedding strategies to maximize top-k retrieval accuracy and conduct user studies with domain collaborators to gather feedback on usability. Our collection comprises 3,200 visualizations across 50 categories, ranging from single-view to coordinated multi-view designs and supporting applications from single-cell epigenomics to structural variation analysis.

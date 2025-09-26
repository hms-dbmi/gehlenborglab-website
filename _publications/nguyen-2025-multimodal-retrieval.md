---
title: 'Geranium: Multimodal Retrieval of Genomics Data Visualizations'
image: nguyen-2025-multimodal-retrieval.png
image-alt: >-
  Top: Overview of the database system for retrieval and authoring genomics data visualizations. Bottom: Search
  interface (left) and authoring interface (right).
members:
  - nils-gehlenborg
  - huyen-nguyen
  - sehi-lyi
  - thomas-smits
year: 2025
type: preprint
publisher: 'https://osf.io/zatw9'
doi: 10.31219/osf.io/zatw9_v5
cite:
  authors: 'HN Nguyen, S L''Yi, TC Smits, S Gao, M Zitnik, N Gehlenborg'
  published: '*OSF Preprints*'
zotero-key: 2NUI34VT
videos:
  - title: Demo video
    url: 'https://osf.io/fn4k7'
other-resources:
  - title: Supplementary material
    url: 'https://osf.io/f4y5a/files/osfstorage'
awards: []
code: 'https://github.com/gosling-lang/geranium'
website: 'https://gosling-lang.github.io/geranium/'
---
To address the challenge of efficiently retrieving information from the vast landscape of genomics data visualizations, we introduce Geranium, a data visualization retrieval system designed for searching and authoring genomics visualizations. The system supports multimodal retrieval, enabling users to query using images, text, or grammar-based specifications. Retrieved examples serve as scaffolds in the authoring process by providing template structures that researchers can modify with their own data, allowing them to focus on analysis rather than low-level visualization construction. Our approach incorporates three embedding methods to leverage both specialized and general knowledge: context-free grammar embeddings tailored for genomics visualizations, multimodal embeddings from a biomedical vision-language foundation model, and textual embeddings from our fine-tuned specification-to-text large language model. For each visualization, we construct a multimodal representation, including declarative specifications using the Gosling grammar, pixel-based renderings, and natural language descriptions. We experiment with different embedding strategies to maximize top-k retrieval accuracy and conduct user studies with domain collaborators to gather feedback on tool usability. The current collection consists of 3,200 visualization examples across approximately 50 categories, spanning single-view to coordinated multi-view visualizations, and covering applications from single-cell epigenomics to structural variation analysis.

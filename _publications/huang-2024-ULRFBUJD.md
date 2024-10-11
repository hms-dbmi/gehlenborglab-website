---
title: A foundation model for clinician-centered drug repurposing
image: huang-2024-ULRFBUJD.png
image-alt: Screenshot of TxGNN Explorer
members:
  - nils-gehlenborg
  - qianwen-wang
year: 2024
type: article
publisher: 'https://www.nature.com/articles/s41591-024-03233-x'
doi: 10.1038/s41591-024-03233-x
cite:
  authors: 'K Huang, P Chandak, Q Wang, S Havaldar, A Vaid, J Leskovec, GN Nadkarni, BS Glicksberg, N Gehlenborg, M Zitnik'
  published: '*Nature Medicine*'
zotero-key: ULRFBUJD
videos: []
other-resources:
  - title: TxGNN
    url: 'https://github.com/mims-harvard/TxGNN'
awards: []
website: 'http://txgnn.org/'
code: 'https://github.com/hms-dbmi/drug_explorer/'
---

Drug repurposing—identifying new therapeutic uses for approved drugs—is often a serendipitous and opportunistic endeavour to expand the use of drugs for new diseases. The clinical utility of drug-repurposing artificial intelligence (AI) models remains limited because these models focus narrowly on diseases for which some drugs already exist. Here we introduce TxGNN, a graph foundation model for zero-shot drug repurposing, identifying therapeutic candidates even for diseases with limited treatment options or no existing drugs. Trained on a medical knowledge graph, TxGNN uses a graph neural network and metric learning module to rank drugs as potential indications and contraindications for 17,080 diseases. When benchmarked against 8 methods, TxGNN improves prediction accuracy for indications by 49.2% and contraindications by 35.1% under stringent zero-shot evaluation. To facilitate model interpretation, TxGNN's Explainer module offers transparent insights into multi-hop medical knowledge paths that form TxGNN’s predictive rationales. Human evaluation of TxGNN’s Explainer showed that TxGNN’s predictions and explanations perform encouragingly on multiple axes of performance beyond accuracy. Many of TxGNN’s new predictions align well with off-label prescriptions that clinicians previously made in a large healthcare system. TxGNN’s drug-repurposing predictions are accurate, consistent with off-label drug use, and can be investigated by human experts through multi-hop interpretable rationales.

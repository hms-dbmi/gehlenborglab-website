---
title: A Generative AI System for Biomedical Data Discovery with Grammar-Based Visualizations
image: lange-2025-CN74ZXPV.png
image-alt: >-
  The schematic figure illustrates how user queries flow through a multi-agent system that generates filters and
  visualizations, producing interactive system outputs. On the left, a user enters natural-language queries the example
  query is &quot;Is there a correlation between height and weight for donors with weight between 30-130?&quot; These inputs are
  routed to an orchestrator agent, which forwards them to specialized agents one that can filter data and one that can
  produce visualizations. The filter agent produces JSON filter specifications (e.g., limiting donor weight between
  30–130), while the visualization agent produces JSON chart specifications. Both outputs are sent to the system for
  rendering. The system output on the right shows a scatterplot of donor height versus weight, the data shows the same
  filter of donor weight between 30-130.
members:
  - devin-lange
  - austen-money
  - priya-misner
  - nils-gehlenborg
year: 2025
type: preprint
publisher: 'https://arxiv.org/abs/2509.16454'
doi: 10.48550/ARXIV.2509.16454
cite:
  authors: 'D Lange, S Gao, P Sui, A Money, P Misner, M Zitnik, N Gehlenborg'
  published: '*arXiv*'
zotero-key: CN74ZXPV
videos: []
other-resources: []
awards: []
---
We explore the potential for combining generative AI with grammar-based visualizations for biomedical data discovery. In our prototype, we use a multi-agent system to generate visualization specifications and apply filters. These visualizations are linked together, resulting in an interactive dashboard that is progressively constructed. Our system leverages the strengths of natural language while maintaining the utility of traditional user interfaces. Furthermore, we utilize generated interactive widgets enabling user adjustment. Finally, we demonstrate the potential utility of this system for biomedical data discovery with a case study.

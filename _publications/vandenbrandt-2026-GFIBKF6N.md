---
title: Agentic Authoring of Interactive Multiview Visualizations in Genomics
image: vandenbrandt-2026-GFIBKF6N.png
image-alt: >-
  Overview of six authoring schemes compared. Two non-agentic baselines (direct generation and fixed pipeline) plus four
  agentic schemes arranged in a 2×2: one general gosling author vs. multiple specialized authors, crossed with reviewer
  vs. no reviewer.
members:
  - astrid-vandenbrandt
  - sehi-lyi
  - devin-lange
  - nils-gehlenborg
year: 2026
type: preprint
publisher: 'http://arxiv.org/abs/2606.00370'
doi: 10.48550/arXiv.2606.00370
cite:
  authors: 'A van den Brandt, K Choe, S L''Yi, D Lange, N Gehlenborg'
  published: '*arXiv*'
zotero-key: GFIBKF6N
videos: []
other-resources:
  - title: Supplementary Materials
    url: 'https://osf.io/uqe83'
awards: []
---
The diverse types of genomics data, scientific questions, and resulting analysis tasks typically require highly specialized visualizations. Users often need to customize or author entirely new visualizations tailored to their specific data and analysis tasks. Although many visualization tools are available, they are typically either limited in the degree of customization they support or require extensive learning or even programming effort to use effectively. Moreover, even when a tool is sufficiently expressive, users may lack the visualization expertise to produce effective designs. Agentic and large language model (LLM)-based approaches are increasingly used to assist in complex scientific and engineering tasks, including data visualization. The use of natural language through conversational interfaces is a promising avenue for democratizing the authoring of complex visualizations. In the context of genomics, these approaches face additional challenges: genomics visualizations typically integrate heterogeneous data types and are composed of multiple linked interactive views. These challenges motivate the exploration of more structured LLM-based schemes. We first characterize where vanilla LLM generation succeeds and fails for genomics visualization, identifying eight quality dimensions. We then compare six schemes—direct generation, a fixed pipeline, and four agentic configurations varying in the number of specialist agents and the presence of a reviewer—across 159 cases spanning three levels of query ambiguity and specification complexity. All schemes use the Gosling visualization grammar as structured output. Our results show that agentic iteration substantially improves perceived quality over both baselines, while we did not observe additional benefits from more complex agent architectures. We discuss implications for the design of agentic systems for domain-specific visualization authoring. All supplemental materials are available at osf.io/uqe83.

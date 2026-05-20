---
title: 'Sycamore: Characterizing Synthetic Personas for Evaluating Genomics Visualization Retrieval'
image: nguyen-2026-sycamore-synthetic-personas.png
image-alt: Overview of the user interface and the three-condition workflow of Sycamore.
members:
  - huyen-nguyen
  - astrid-vandenbrandt
  - nils-gehlenborg
year: 2026
type: preprint
publisher: 'https://arxiv.org/abs/2605.08630'
doi: 10.48550/arXiv.2605.08630
cite:
  authors: 'HN Nguyen, A Brandt, N Gehlenborg'
  published: '*arXiv*'
zotero-key: LS3Y9MNS
videos:
  - title: Demo video
    url: 'https://osf.io/kdfr3/files/be38c'
other-resources: 
  - title: Supplementary materials
    url: 'https://osf.io/kdfr3'
awards: []
code: 'https://github.com/huyen-nguyen/sycamore'
preprint: 'https://arxiv.org/abs/2605.08630'
---
Evaluating visualization systems in niche domains such as genomics is challenging due to scarcity of domain experts and difficulty recruiting a representative user base. While LLM-based synthetic personas are increasingly used to ease evaluation bottlenecks, they face well-founded skepticism. Rather than weighing synthetic personas as substitutes for real users, we ask a fundamental open question: when synthetic personas evaluate a real visualization system, what do they actually produce, and how does that output change when grounded in documented human contexts? We present Sycamore, an exploratory three-condition probe design using Geranium, a search engine for multimodal genomics visualization, as a case study. Sycamore evaluates Geranium using: (1) ungrounded synthetic personas from generic LLM priors; (2) grounded synthetic personas constrained by voice-of-customer artifacts from a prior interview study; and (3) a published baseline study of real domain experts. We observe that grounding shifts synthetic feedback toward the language and concerns of documented users, while ungrounded evaluators drift toward operational specifics that real participants did not raise; both synthetic conditions, however, converge on a find-and-adapt frame and miss the image-modality preference observed in the expert study. We discuss what these observations imply for where synthetic personas might fit alongside expert studies in domain-specific visualization evaluation. All supplemental materials are available at https://osf.io/kdfr3/.

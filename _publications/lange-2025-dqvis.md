---
title: "DQVis Dataset: Natural Language to Biomedical Visualization"
image: lange-2025-dqvis.png
members:
  - devin-lange
  - nils-gehlenborg
year: 2025
type: preprint
publisher: "https://osf.io/preprints/osf/rqb7u_v1"
doi: 10.31219/osf.io/rqb7u_v1
cite:
  authors: "Lange, D., Sui, P., Gao, S., Zitnik, M., & Gehlenborg, N. "
zotero-key: 376CQGS4
videos: []
other-resources:
  - title: "HuggingFace Dataset"
    url: "https://huggingface.co/datasets/HIDIVE/DQVis"
awards: []
code: "https://github.com/hms-dbmi/DQVis-Generation"
---

Biomedical research data portals are essential resources for scientific inquiry, and interactive exploratory visualizations are an integral component for querying such data repositories. Increasingly, machine learning is being integrated into visualization systems to create natural language interfaces where questions about data can be answered with visualizations, and follow-up questions can build on the previous state. This paper introduces a framework that takes abstract low-level questions about data and a visualization grammar specification that can answer such a question, reifies them with data entities and fields that meet certain constraints, and paraphrases the question language to produce the final collection of realized data-question-visualization triplets. Furthermore, we can link these foundational elements together to construct chains of queries, visualizations, and follow-up queries. We developed an open-source review interface for evaluating the results of these datasets. We applied this framework to five biomedical research data repositories, resulting in DQVis, a dataset of 1.08 million data-question-visualization triplets and 11.4 thousand two-step question samples. Five visualization experts provided feedback on the generated dataset through our review interface. We present a summary of their input and publish the full reviews as an additional resource alongside the dataset. The DQVis dataset and generation code are available at [https://huggingface.co/datasets/HIDIVE/DQVis](https://huggingface.co/datasets/HIDIVE/DQVis) and [https://github.com/hms-dbmi/DQVis-Generation](https://github.com/hms-dbmi/DQVis-Generation).

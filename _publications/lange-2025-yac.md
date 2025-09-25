---
title: "YAC: Bridging Natural Language and Interactive Visual Exploration with Generative AI for Biomedical Data Discovery"
image: lange-2025-yac.png
image-alt: >-
  Screenshot YAC discovery interface, combining a chat panel and a linked visualization dashboard for interactive data
  exploration. On the left, the chat interface displays user queries and agent responses, with widgets that let users
  adjust visualizations and filters. On the right, the dashboard contains multiple generated charts that update
  dynamically based on filters and selections. The chat interface includes visualization adjustment widgets,
  agent-generated filters, and user-controlled filters. The dashboard provides bar charts, scatterplots, and cumulative
  distribution plots, all linked so that selections in one view update the others. A status bar shows record counts for
  entities, a filter bar displays currently active filters, and a download button allows exporting the selected data.
members:
  - devin-lange
  - austen-money
  - priya-misner
  - nils-gehlenborg
year: 2025
type: preprint
publisher: "https://arxiv.org/abs/2509.19182"
doi: 10.48550/arXiv.2509.19182
cite:
  authors: "D Lange, S Gao, P Sui, A Money, P Misner, M Zitnik, N Gehlenborg"
  published: "*arXiv*"
zotero-key: LQL6VZRP
videos: []
other-resources: []
awards: []
code: "https://github.com/hms-dbmi/udi-chat"
---

Incorporating natural language input has the potential to improve the capabilities of biomedical data discovery interfaces. However, user interface elements and visualizations are still powerful tools for interacting with data, even in the new world of generative AI. In our prototype system, YAC, Yet Another Chatbot, we bridge the gap between natural language and interactive visualizations by generating structured declarative output with a multi-agent system and interpreting that output to render linked interactive visualizations and apply data filters. Furthermore, we include widgets, which allow users to adjust the values of that structured output through user interface elements.
We reflect on the capabilities and design of this system with an analysis of its technical dimensions and illustrate the capabilities through four usage scenarios.

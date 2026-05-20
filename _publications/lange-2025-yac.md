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
  - priya-misner
  - astrid-vandenbrandt
  - austen-money
  - nikolay-akhmetov
  - lisa-choy
  - nils-gehlenborg
year: 2025
type: preprint
publisher: "https://arxiv.org/abs/2509.19182"
doi: 10.48550/arXiv.2509.19182
cite:
  authors: "D Lange, S Gao, P Sui, P Misner, A van den Brandt, A Money, N Akhmetov, L Choy. M Zitnik, N Gehlenborg"
  published: "*arXiv*"
zotero-key: LQL6VZRP
videos: []
other-resources: []
awards: []
code: "https://github.com/hms-dbmi/udi-chat"
---

Incorporating natural language input has the potential to improve the capabilities of biomedical data discovery interfaces. However, user interface elements and visualizations are still powerful tools for interacting with data. In our prototype system, YAC, Yet Another Chatbot, we integrate natural language and interactive visualizations. YAC uses a tool-calling multi-agent system to generate declarative output, which is interpreted to render linked interactive visualizations and apply data filters. We also include adjustment widgets, which allow users to directly modify the structured output. Structured text is also generated to clarify user intent, notify users of system boundaries, and explain aspects of the data with live data element links. We conducted a user study with domain experts to surface areas where YAC can be improved. Furthermore we reflect on the capabilities and design of this system with an analysis of its technical dimensions.

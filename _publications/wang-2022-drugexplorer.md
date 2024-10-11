---
title: "Extending the Nested Model for User-Centric XAI: A Design Study on GNN-based Drug Repurposing"
image: drugxai.png

members:
  - qianwen-wang
  - nils-gehlenborg

year: 2022
type: article

publisher: "https://doi.org/10.31219/osf.io/b76nt"
doi: "10.1109/TVCG.2022.3209435"
zotero-key: "H6YDK8WJ"
preprint: "https://doi.org/10.31219/osf.io/b76nt"
cite:
  authors: "Q Wang, K Huang, P Chandak, M Zitnik, N Gehlenborg"
  published: "*IEEE Transactions on Visualization and Computer Graphics* **29**(1):1266-1276"

---
Whether AI explanations can help users achieve specific tasks efficiently (i.e., usable explanations) is significantly influenced by their visual presentation.
While many techniques exist to generate explanations, it remains unclear how to select and visually present AI explanations based on the characteristics of domain users.
This paper aims to understand this question through a multidisciplinary design study for a specific problem: explaining graph neural network (GNN) predictions to domain experts in drug repurposing, i.e., reuse of existing drugs for new diseases.
Building on the nested design model of visualization, we incorporate XAI design considerations from a literature review and from our collaborators' feedback into the design process.
Specifically, we discuss XAI-related design considerations for usable visual explanations at each design layer: target user, usage context, domain explanation, and XAI goal at the domain layer; format, granularity, and operation of explanations at the abstraction layer; encodings and interactions at the visualization layer; and XAI and rendering algorithm at the algorithm layer.
We present how the extended nested model motivates and informs the design of DrugExplorer, an XAI tool for drug repurposing.
Based on our domain characterization, DrugExplorer provides path-based explanations and presents them both as individual paths and meta-paths for two key XAI operations, why and what else.
DrugExplorer offers a novel visualization design called MetaMatrix with a set of interactions to help domain users organize and compare explanation paths at different levels of granularity to generate domain-meaningful insights.
We demonstrate the effectiveness of the selected visual presentation and DrugExplorer as a whole via a usage scenario, a user study, and expert interviews.
From these evaluations, we derive insightful observations and reflections that can inform the design of XAI visualizations for other scientific applications. 

<b>IMLH Workshop @ICML 2021 Best Paper Award </b>

<b>IEEE VIS 2022 Best Paper Honorable Mention </b>
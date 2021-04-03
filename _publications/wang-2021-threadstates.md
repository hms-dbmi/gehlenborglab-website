---
title: "ThreadStates: State-based Visual Analysis of Disease Progression"
image: threadstates-osf.png

members:
  - qianwen-wang
  - theresa-harbig
  - nils-gehlenborg

year: 2021
type: preprint

publisher: "https://doi.org/10.31219/osf.io/vcskm"
cite:
  authors: "Qianwen Wang, Tali Mazor, Theresa A. Harbig, Ethan Cerami, and Nils Gehlenborg"
  published: "OSF Preprints"
---
A growing number of longitudinal cohort studies are generating data with extensive patient observations across multiple timepoints. Such data offers promising opportunities to better understand the progression of diseases. However, most existing visual analysis tools of health records are aimed at general event sequences and little attention has been paid to common types of clinical data that contain extensive observations. To fill this gap, we designed and implemented ThreadStates, an interactive visual analytics tool for the exploration of longitudinal patient cohort data. The focus of ThreadStates is to identify the states of disease progression by learning from observation data in a human-in-the-loop manner. We propose a novel matrix+glyph design and combine it with a scatter plot to enable seamless identification, observation, and refinement of states. The disease progression patterns are then revealed in terms of state transitions using Sankey-based visualizations. We employ sequence clustering techniques to find patient groups with distinctive progression patterns, and to reveal the association between disease progression and patient-level features. The design and development were driven by a requirement analysis and iteratively refined based on feedback from domain experts over the course of a 10-month design study. Case studies and expert interviews demonstrate that ThreadStates can successively summarize disease states, reveal disease progression, and compare patient groups.

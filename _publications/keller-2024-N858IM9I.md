---
title: 'Use-Coordination: Model, Grammar, and Library for Implementation of Coordinated Multiple Views'
image: keller-2024-N858IM9I.png
members:
  - mark-keller
  - trevor-manz
  - nils-gehlenborg
year: 2024
type: article
publisher: 'https://ieeexplore.ieee.org/document/10771108'
doi: 10.1109/VIS55277.2024.00041
zotero-key: N858IM9I
cite:
  authors: 'MS Keller, T Manz, N Gehlenborg'
  published: '*2024 IEEE Visualization and Visual Analytics (VIS)*'
image-alt: Screenshot 2024-12-04 at 9 14 17 AM
videos:
  - title: Conference Presentation
    url: 'https://www.youtube.com/live/jlbzvyg9IZc?si=Yk7QsuE845foax6f&t=3869'
other-resources: []
awards: []
website: 'https://use-coordination.dev'
code: 'https://github.com/keller-mark/use-coordination/'
preprint: 'https://osf.io/vhs7m'
---
Coordinated multiple views (CMV) in a visual analytics system can help users explore multiple data representations simultaneously with linked interactions. However, the implementation of coordinated multiple views can be challenging. Without standard software libraries, visualization designers need to re-implement CMV during the development of each system. We introduce use-coordination, a grammar and software library that supports the efficient implementation of CMV. The grammar defines a JSON-based representation for an abstract coordination model from the information visualization literature. We contribute an optional extension to the model and grammar that allows for hierarchical coordination. Through three use cases, we show that use-coordinationenables implementation of CMV in systems containing not only basic statistical charts but also more complex visualizations such as medical imaging volumes. We describe six software extensions, including a graphical editor for manipulation of coordination, which showcase the potential to build upon our coordination-focused declarative approach. The software is open-source and available at https://use-coordination.dev.

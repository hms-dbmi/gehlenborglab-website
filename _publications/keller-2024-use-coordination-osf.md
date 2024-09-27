---
title: "Use-Coordination: Model, Grammar, and Library for Implementation of Coordinated Multiple Views"
image: use-coordination.png

members:
  - mark-keller
  - trevor-manz
  - nils-gehlenborg

year: 2024
type: preprint

publisher: "https://osf.io/preprints/osf/vhs7m"
cite:
  authors: "MS Keller, T Manz, N Gehlenborg"
  published: "*OSF Preprints* doi:10.31219/osf.io/vhs7m"
---
Coordinated multiple views (CMV) in a visual analytics system can help users explore multiple data representations simultaneously with linked interactions. However, the implementation of coordinated multiple views can be challenging. Without standard software libraries, visualization designers need to re-implement CMV during the development of each system. We introduce use-coordination, a grammar and software library that supports the efficient implementation of CMV. The grammar defines a JSON-based representation for an abstract coordination model from the information visualization literature. We contribute an optional extension to the model and grammar that allows for hierarchical coordination. Through three use cases, we show that use-coordination enables implementation of CMV in systems containing not only basic statistical charts but also more complex visualizations such as medical imaging volumes. We describe six software extensions, including a graphical editor for manipulation of coordination, which showcase the potential to build upon our coordination-focused declarative approach.

The source code and documentation are available under the MIT License at [https://github.com/keller-mark/use-coordination](https://github.com/keller-mark/use-coordination).

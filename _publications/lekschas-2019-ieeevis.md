---
title: "Pattern-Driven Navigation in 2D Multiscale Visualizations with Scalable Insets"
image: scalable-insets.png

members:
  - fritz-lekschas
  - peter-kerpedjiev
  - nils-gehlenborg

year: 2019
type: article

publisher: "https://doi.org/10.1101/301036"
cite:
  authors: "F Lekschas, M Behrisch, B Bach, P Kerpedjiev, N Gehlenborg, H Pfister"
  published: "*IEEE Transactions on Visualization and Computer Graphics*, to appear. DOI: https://doi.org/10.1109/TVCG.2019.2934555"
---
We present Scalable Insets, a technique for interactively exploring and navigating large numbers of annotated patterns in multiscale visualizations such as gigapixel images, matrices, or maps. Exploration of many but sparsely-distributed patterns in multiscale visualizations is challenging as visual representations change across zoom levels, context and navigational cues get lost upon zooming, and navigation is time consuming. Our technique visualizes annotated patterns too small to be identifiable at certain zoom levels using insets, i.e., magnified thumbnail views of the annotated patterns. Insets support users in searching, comparing, and contextualizing patterns while reducing the amount of navigation needed. They are dynamically placed either within the viewport or along the boundary of the viewport to offer a compromise between locality and context preservation. Annotated patterns are interactively clustered by location and type. They are visually represented as an aggregated inset to provide scalable exploration within a single viewport. In a controlled user study with 18 participants, we found that Scalable Insets can speed up visual search and improve the accuracy of pattern comparison at the cost of slower frequency estimation compared to a baseline technique. A second study with 6 experts in the field of genomics showed that Scalable Insets is easy to learn and provides first insights into how Scalable Insets can be applied in an open-ended data exploration scenario.

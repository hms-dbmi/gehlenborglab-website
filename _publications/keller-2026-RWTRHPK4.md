---
title: 'Pluot: Towards ''write once, run everywhere'' visualization software'
image: keller-2026-RWTRHPK4.png
image-alt: >-
  Figure 1b. The Pluot architecture enables developers to implement a visualization using a single toolkit in Rust.
  Bindings to Rust plotting functions can be generated for other languages such as Python and JavaScript. Pluot scales
  to out-of-core dataset sizes by performing partial reads of data.
members:
  - mark-keller
  - nils-gehlenborg
year: 2026
type: preprint
publisher: 'http://arxiv.org/abs/2605.14118'
doi: 10.48550/arXiv.2605.14118
cite:
  authors: MS Keller and N Gehlenborg
  published: '*arXiv*'
zotero-key: RWTRHPK4
videos: []
other-resources: []
awards: []
website: 'https://pluot.dev'
code: 'https://github.com/keller-mark/pluot'
---
Tools used for implementing visualization software systems can generally be divided into camps such as static versus interactive and desktop versus web-based. We contribute Pluot, an architecture that bridges these divides, enabling a single software implementation of a visualization to be used regardless of the target level of interactivity or computing environment. With Pluot, a visualization developer implements a given visualization rendering function once, using the Rust programming language. Then, bindings to the Rust program can be generated to enable reproducible execution of the rendering function from other languages, such as Python or JavaScript. Pluot can render visualizations to bitmap or vector graphics format, bridging gaps between interactive performance and publication-quality figure creation. The software is available at https://pluot.dev.

---
title: "Peax: Interactive Visual Pattern Search in Sequential Data Using Unsupervised Deep Representation Learning"
image: peax.png
image-alt: The Figure shows the PEAX System

members:
  - fritz-lekschas
  - nils-gehlenborg

year: 2020
type: article

publisher: "https://onlinelibrary.wiley.com/doi/10.1111/cgf.13971"
doi: "10.1111/cgf.13971"
zotero-key: "MXQ5NQFW"
cite:
  authors: "F Lekschas, B Peterson, D Haehn, E Ma, N Gehlenborg, H Pfister"
  published: "*Computer Graphics Forum* **39**(3):167-179"
---
We present Peax, a novel feature-based technique for interactive visual pattern search in sequential data, like time series or data mapped to a genome sequence. Visually searching for patterns by similarity is often challenging because of the large search space, the visual complexity of patterns, and the user’s perception of similarity. For example, in genomics, researchers try to link patterns in multivariate sequential data to cellular or pathogenic processes, but a lack of ground truth and high variance makes automatic pattern detection unreliable. We have developed a convolutional autoencoder for unsupervised representation learning of regions in sequential data that can capture more visual details of complex patterns compared to existing similarity measures. Using this learned representation as features of the sequential data, our accompanying visual query system enables interactive feedback-driven adjustments of the pattern search to adapt to the users’ perceived similarity. Using an active learning sampling strategy, Peax collects user-generated binary relevance feedback. This feedback is used to train a model for binary classification, to ultimately find other regions that exhibit patterns similar to the search target. We demonstrate Peax’s features through a case study in genomics and report on a user study with eight domain experts to assess the usability and usefulness of Peax. Moreover, we evaluate the effectiveness of the learned feature representation for visual similarity search in two additional user studies. We find that our models retrieve significantly more similar patterns than other commonly used techniques.

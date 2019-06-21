---
title: "Interactive visual pattern search in sequential data using unsupervised deep representation learning"

members:
  - fritz-lekschas
  - nils-gehlenborg

year: 2019
type: preprint

publisher: "https://doi.org/10.1101/597518"
cite:
  authors: "F Lekschas, B Peterson, D Haehn, E Ma, N Gehlenborg, H Pfister"
  published: "bioRxiv 597518"
---
We present Peax, a novel feature-based technique for interactive visual pattern search in sequential data, like time series or data mapped to a genome sequence. Visually searching for patterns by similarity is often challenging because of the large search space, the visual complexity of patterns, and the user’s perception of similarity. For example, in genomics, researchers try to link patterns in multivariate sequential data to fundamental cellular or pathogenic processes, but a lack of ground truth and high variance makes automatic pattern detection unreliable. We have developed a convolutional autoencoder for unsupervised representation learning of regions in sequential data that can capture more visual details of complex patterns compared to existing similarity measures. Using this learned representation as features of the sequential data, our accompanying visual query system enables interactive feedback-driven adjustments of the pattern search to adapt to the users’ perceived similarity. While users label regions as either matching their search target or not, a random forest classifier learns to weigh the importance of different dimensions of the learned representation. We employ an active learning sampling strategy to focus the labeling process on regions that will improve the classifier in subsequent training. Peax is open-source, customizable, and we demonstrate its features through an extensive case study in genomics. Moreover, we report on the ability of our autoencoder models to capture visual features and evaluate the effectiveness of the learned representation for similarity search in two user studies. We show that our models retrieve significantly more similar patterns than other commonly used techniques.

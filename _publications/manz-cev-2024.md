---
title: "A General Framework for Comparing Embedding Visualizations Across Class-Label Hierarchies"
image: cev.png
members:
  - trevor-manz
  - fritz-lekschas
  - nils-gehlenborg
year: 2024
type: article
publisher: "https://doi.org/10.31219/osf.io/puxnf"
cite:
  authors: "Trevor Manz, Fritz Lekschas, Evan Greene, Greg Finak, Nils Gehlenborg"
  published: "Accepted at IEEE VIS 2024 and IEEE Transactions on Visualization and Computer Graphics"
---
Projecting high-dimensional vectors into two dimensions for visualization,
known as embedding visualization, facilitates perceptual reasoning and
interpretation. Comparison of multiple embedding visualizations drives
decision-making in many domains, but conventional comparison methods are
limited by a reliance on direct point correspondences. This requirement
precludes embedding comparisons without point correspondences, such as two
different datasets of annotated images, and fails to capture meaningful
higher-level relationships among point groups. To address these shortcomings,
we propose a general framework to compare embedding visualizations based on
shared class labels rather than individual points. Our approach partitions
points into regions corresponding to three key class concepts--confusion,
neighborhood, and relative size--to characterize intra- and inter-class
relationships. Informed by a preliminary user study, we realize an
implementation of our framework using perceptual neighborhood graphs to define
these regions and introduce metrics to quantify each concept. We demonstrate
the generality of our framework with use cases from machine learning and
single-cell biology, highlighting our metrics' ability to draw insightful
comparisons across label hierarchies. To assess the effectiveness of our
approach, we conducted a user study with five machine learning researchers and
six single-cell biologists using an interactive and scalable prototype
developed in Python and Rust. Our metrics enable more structured comparison
through visual guidance and increased participants’ confidence in their
findings.

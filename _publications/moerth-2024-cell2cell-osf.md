---
title: "Cell2Cell: Explorative Cell Interaction Analysis in Multi-Volumetric Tissue Data"
image: cell2cell.png

members:
  - eric-moerth
  - nils-gehlenborg

year: 2024
type: preprint

publisher: "https://doi.org/10.31219/osf.io/axy82"
cite:
  authors: " Eric Mörth, Kevin Sidak, Zoltan Maliga, Torsten Moeller, Nils Gehlenborg, Peter Sorger, Hanspeter Pfister, Johanna Beyer, and Robert Krüger"
  published: "Accepted at IEEE VIS 2024 and IEEE Transactions on Visualization and Computer Graphics."
---

We present Cell2Cell, a novel visual analytics approach for quantifying and visualizing networks of cell-cell interactions in three-dimensional (3D) multi-channel cancerous tissue data. By analyzing cellular interactions, biomedical experts can gain a more accurate understanding of the intricate relationships between cancer and immune cells. Recent methods have focused on inferring interaction based on the proximity of cells in low-resolution 2D multi-channel imaging data. By contrast, we analyze cell interactions by quantifying the presence and levels of specific proteins within a tissue sample (protein expressions) extracted from high-resolution 3D multi-channel volume data. Such analyses have a strong exploratory nature and require a tight integration of domain experts in the analysis loop to leverage their deep knowledge. We propose two complementary semi-automated approaches to cope with the increasing size and complexity of the data interactively: On the one hand, we interpret cell-to-cell interactions as edges in a cell graph and analyze the image signal (protein expressions) along those edges, using spatial as well as abstract visualizations. Complementary, we propose a cell-centered approach, enabling scientists to visually analyze polarized distributions of proteins in three dimensions, which also captures neighboring cells with biochemical and cell biological consequences. We evaluate our application in three case studies, where biologists and medical experts use Cell2Cell to investigate tumor micro-environments to identify and quantify T-cell activation in human tissue data. We confirmed that our tool can fully solve the use cases and enables a streamlined and detailed analysis of cell-cell interactions.


---
title: 'SpatialQuery: scalable discovery and molecular characterization of multicellular motifs from spatial omics data'
image: an-2026-WZSV3IGS.png
image-alt: >-
  Figures 1 and 6. Figure 1 is a schematic of the inputs, analysis methods, and outputs of the method. The required
  inputs are the cell coordinates and cell type annotations. The motif enrichment analysis method identifies enriched
  motifs and their member cell types. The differential gene analysis requires the cell-by-gene expression matrix as
  input and enables comparisons such as cells within a motif nearby a specified cell type vs. cells not contained in the
  motif nearby the specified cell type, cells within motif A nearby a specified cell type vs. cells within motif B
  nearby the specified cell type, or motif member cells in samples with condition A vs. motif member cells in samples
  with condition B. Finally, SpatialQuery can identify pairs of genes that covary together (positively or negatively).
  In Python notebooks, Vitessce can be used to trigger SpatialQuery analyses and display the resulting motifs.
members:
  - mark-keller
  - nils-gehlenborg
year: 2026
type: preprint
publisher: 'http://biorxiv.org/lookup/doi/10.64898/2026.04.22.720136'
doi: 10.64898/2026.04.22.720136
cite:
  authors: 'S An, M Keller, N Gehlenborg, M Hemberg'
  published: '*bioRxiv*'
zotero-key: WZSV3IGS
videos: []
other-resources: []
awards: []
website: 'https://spatialquery.readthedocs.io/en/latest/'
code: 'https://github.com/ShaokunAn/Spatial-Query'
---
Spatially resolved single-cell technologies enable profiling of cells in situ, yet computational approaches that jointly discover multicellular spatial patterns and characterize their molecular programs remain limited. Here we introduce SpatialQuery, a framework that can both identify cellular motifs, i.e. recurrent multicellular co-localization patterns, and perform molecular analyses focused on the motifs. It uncovers genes modulated by spatial contexts through differential expression analysis, and detects coordinated expression changes through covariation analysis. SpatialQuery can identify functional tissue units, and goes beyond pairwise analyses to characterize multicellular interactions. Applications to both spatial transcriptomics and proteomics data uncover cross-germ-layer signaling in gut tube patterning, disease-specific fibrotic and immunosuppressive niches in kidney and colon, and regional determinants of motif-associated transcriptional programs in a mouse brain atlas. SpatialQuery is available as a Python package, and we demonstrate how its light computational footprint enables integration into web-based cell atlas portals for interactive visualization and exploration.

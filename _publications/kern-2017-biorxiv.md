---
title: "Interactive Visual Exploration And Refinement Of Cluster Assignments"
image: stratomex.png
image-alt: Screenshot of Caleydo StratomeX, which forms the basis of the technique introduced in the paper showing data from the TCGA Kidney Renal Clear Cell Carcinoma dataset. 

members:
  - nils-gehlenborg
year: 2017
type: article

publisher: "https://bmcbioinformatics.biomedcentral.com/articles/10.1186/s12859-017-1813-7"
doi: "10.1186/s12859-017-1813-7"
zotero-key: "5NRFQA3T"
cite:
  authors: "M Kern, A Lex, N Gehlenborg, CR Johnson"
  published: "*BMC Bioinformatics* **18**(1):406"
---
With ever-increasing amounts of data produced in biology research, scientists are in need of efficient data analysis methods. Cluster analysis, combined with visualization of the results, is one such method that can be used to make sense of large data volumes. At the same time, cluster analysis is known to be imperfect and depends on the choice of algorithms, parameters, and distance measures. Most clustering algorithms don't properly account for ambiguity in the source data, as records are often assigned to discrete clusters, even if an assignment is unclear. While there are metrics and visualization techniques that allow analysts to compare clusterings or to judge cluster quality, there is no comprehensive method that allows analysts to evaluate, compare, and refine cluster assignments based on the source data, derived scores, and contextual data. In this paper, we introduce a method that explicitly visualizes the quality of cluster assignments, allows comparisons of clustering results and enables analysts to manually curate and refine cluster assignments. Our methods are applicable to matrix data clustered with partitional, hierarchical, and fuzzy clustering algorithms. Furthermore, we enable analysts to explore clustering results in context of other data, for example, to observe whether a clustering of genomic data results in a meaningful differentiation in phenotypes. Our methods are integrated into Caleydo StratomeX, a popular, web-based, disease subtype analysis tool. We show in a usage scenario that our approach can reveal ambiguities in cluster assignments and produce improved clusterings that better differentiate genotypes and phenotypes.
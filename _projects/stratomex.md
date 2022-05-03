---
name: Caleydo StratomeX
active: true

members:
  - nils-gehlenborg

publications:
  - kern-2017-biorxiv
  - gehlenborg-2014-nature-stratifications
  - gehlenborg-2012-computer-graphics

collaborators:
  - alexander-lex
  - marc-streit
  - hanspeter-pfister
  - peter-park

websites:
  - name: StratomeX Website
    url: http://stratomex.caleydo.org
    primary: true
  - name: StratomeX Web Version
    description: Prototype for a web-based StratomeX with Vistories support.
    url: https://stratomex.caleydoapp.org/

gallery:
  stratomex.png: Screenshot

github_repositories:
  - name: Caleydo Core
    description: Repository for all Caleydo standalone tools and plugins.
    url: https://github.com/Caleydo/caleydo
    primary: true

docker_repositories:

grants:
  - nih_u01ca200059

blurb: "Integrative visualization of stratified heterogeneous data for disease subtype analysis."
---
Identification and characterization of cancer subtypes are important areas of research that are based on the integrated analysis of multiple heterogeneous genomics datasets. Since there are no tools supporting this process, much of this work is done using ad-hoc scripts and static plots, which is inefficient and limits visual exploration of the data. To address this, we have developed StratomeX, an integrative visualization tool that allows investigatorsto explore the relationships of candidate subtypes across multiple genomic data types such as gene expression, DNA methylation, or copy number data. StratomeX represents datasets as columns and subtypes as bricks in thesecolumns. Ribbons between the columns connect bricks to show subtype relationships across datasets. Drill-downfeatures enable detailed exploration. StratomeX provides insights into the functional and clinical implications ofcandidate subtypes by employing small multiples, which allow investigators to assess the effect of subtypes onmolecular pathways or outcomes such as patient survival. As the configuration of viewing parameters in such a multi-dataset, multi-view scenario is complex, we propose a meta-visualization and configuration interface for dataset dependencies and data-view relationships.

---
name: SATORI
active: true

members:
  - fritz-lekschas
  - nils-gehlenborg

publications:
  - lekschas-2017-satori

websites:
  - name: SATORI Project
    description: 
    url: http://satori.refinery-platform.org/
    primary: true
  - name: SATORI Demo Server
    description: 
    url: http://satori.cloud.refinery-platform.org/#/

gallery:
  satori.png: Screenshot

github_repositories:
  - name: Refinery Ontology Imports
    description: Batch import of ontology definition files into Refinery.
    url: https://github.com/refinery-platform/ontology-imports
  - name: Neo4J Ontology Extensions
    description: Plugins and extensions for Neo4J to handle ontologies.
    url: https://github.com/refinery-platform/neo4j-ontology
  - name: OWL to Neo4J
    description: Tool to convert OWL to labeled property graph and import into Neo4J.
    url: https://github.com/flekschas/owl2neo4j
  - name: D3 List Graph
    description: D3 layout for a graph composed of adjacent lists of nodes.
    url: https://github.com/flekschas/d3-list-graph

docker_repositories:

grants:
  - hsci_csbi
  
blurb: An ontology-guided visual exploration system that combines a powerful metadata search with a tree map and a node-link diagram that visualize the repository structure, provide context to retrieved data sets, and serve as an interface to drive semantic querying and browsing of the repository.
---
To enable exploration of biomedical data repositories, we have developed SATORI—an ontology-guided visual exploration system—that combines a powerful metadata search with a tree map and a node-link diagram that visualize the repository structure, provide context to retrieved data sets, and serve as an interface to drive semantic querying and browsing of the repository. The requirements for SATORI were derived in semi-structured interviews with biomedical data scientists. We demonstrate its utility by describing several usage scenarios using a stem cell data reposito ry, discoveries we made in the process of developing them, and an evaluation of SATORI with domain experts. We have integrated an open-source, web-based implementation of SATORI in the data repository of the [Refinery Platform]() for biomedical data analysis and visualization.

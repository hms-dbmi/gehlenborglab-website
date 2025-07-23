---
name: Universal Discovery Interface (UDI)
active: true

members:
  - nils-gehlenborg
  - devin-lange
  - priya-misner
  - austen-money

collaborators:
  - marinka-zitnik
  - shanghua-gao
  - pengwei-sui

publications:
  - lange-2025-12345

websites:
  - name: Universal Discovery Interface Visualization Grammar
    description: Details on the visualization grammar.
    url: https://hms-dbmi.github.io/udi-grammar/#/
    primary: true
  - name: OSF DQVis Dataset
    description: Dataset of 1.08 million data-question-visualization triplets and 11.4 thousand two-step question samples.
    url: https://huggingface.co/datasets/DevLan/DQVis
  - name: Universal Discovery Interface Toolkit
    description: Viz toolkit npm package.
    url: https://www.npmjs.com/package/udi-toolkit 
  - name: Universal Discovery Interface Visualization Grammar Python Package
    description: Python code for generating Universal Discovery Interface (UDI) specifications.
    url: https://pypi.org/project/udi-grammar-py/
  

github_repositories:
  - name: Universal Discovery Interface Visualization Grammar
    description: The Universal Discovery Interface (UDI) Grammar repository includes TypeScript type definitions, a frontend visualization component for rendering UDI specifications, and a website with examples and a live editor.
    url: https://github.com/hms-dbmi/udi-grammar
    primary: true
  - name: Universal Discovery Interface Grammar Python
    description:
    url: https://github.com/hms-dbmi/udi-grammar-py
  - name: DQVis Data Generation
    description:
    url: https://github.com/hms-dbmi/DQVis-Generation
  - name: DQVis Data Review
    description:
    url: https://github.com/hms-dbmi/DQVis-review

grants:
  - arpahbdf_1aysax00000x

gallery:
  udi-chat-withfilters.png: An image showing a chat converation asking about the number of donor records on the left hand side and a collection of five charts on the right hand side. Clockwise from the upper left, the charts depict a CDF chart of donor age colored by race, a scatter plot of donor height vs weight colored by sex, a bar chart of donor sex, a table showing number of donor records and a bar chart of the donor count by race. 
  udi-examples.png: A screenshot of the UDI webpage showing a collection of charts that the interface supports. 
  udi-grammar.png: A screenshot of the UDI grammar webpage depicting the a scatterplot on the right and the grammar needed to generate the plot on the left. 

blurb: Connect biomedical research data from thousands of sources and overcome barriers caused by incompatible data dialects.
---

In this project, we propose to build the Universal Discovery Interface (UDI) for the Biomedical Data Fabric Toolbox. We define a discovery interface as a data-centric, visual user interface designed to support exploration and discovery in biomedical data resources such as data repositories, data warehouse, knowledgebases, data portals, and others. We propose a discovery interface that can be applied to essentially any biomedical data resource and therefore refer to it as a universal discovery interface. The Universal Discovery Interface will:

  1) Provide an intuitive, exploratory approach for disease-agnostic discovery for a wide spectrum of biomedical data resources integrated into the Biomedical Data Fabric.

  2) Broaden access to biomedical data resources to reach larger audiences of data consumers.

  3) Increase effectiveness of exploratory interfaces for biomedical data resources.

  4) Make design, implementation, and maintenance of biomedical data resources more efficient.

The Universal Discovery Interface (UDI) will be a set of frontend and backend software components and machine learning (ML) models that can be integrated with any biomedical data resource. Once integrated, the UDI will provide support for exploration and discovery within and across biomedical data resources through natural language driven generation of interactive visualizations and dashboards.

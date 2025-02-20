---
# make sure to add page to _data/teams.yml

name: Accessibility of Genomics Visualization
team_id: accessibility
active: true

image: altgosling-structure.png
image_alt: A schematic showing how AltGosling interacts with the Gosling Spec and Gosling.js to construct alt text, long descriptions, and Tree-structured descriptions from Gosling Spec features and Gosling Renderer data.

publications:
  - smits-2024-9X8PFMGP

# gallery:
#   smits-2024-S4RH9GKM-2.png: 'The 4DN DCIC data portal page lists available datasets and their associated metadata'
# needs an alt text

---

## Overview

The AltGosling Project focuses on developing accessible genomics visualization tools. It aims to bridge the gap in genomic data interpretation for individuals with visual impairments. The project adds screen reader support to the Gosling, extracting information from the Gosling specification and leveraging a collapsible tree to create intuitive, user-friendly interfaces, ensuring that genomics research is inclusive and accessible to a broader audience. This project not only advances scientific inclusivity but embodies HIDIVE Lab's commitment to accessible science. You can read more about this project on the publication page that is linked below.

## Highlights
- As a first of its kind, AltGosling creates automatic text descriptions for genomic data visualizations, which are characterized by large datasets and importance of interactions such as zooming and panning for data exploration. 

- Using a collapible tree structure, we allow users to easily navigate long descriptions and decide on their level of details.

- To showcase its features, we created a [demonstration](https://gosling-lang.github.io/altgosling/) with ten examples, of which five are single charts and five are composite visualizations. 

- We compared AltGosling to state-of-the art models such as GPT-4o and show that AltGosling outperforms these models in accuracy, completesness, and method of delivery.

- We are happy to receive feedback and work on new features. Feel free to [submit issues on GitHub](https://github.com/gosling-lang/altgosling/issues) or reach out via [email](mailto:nils@hms.harvard.edu).

## Call To Action

[Access the GitHub Repo](https://github.com/gosling-lang/altgosling)
[Try the demonstration](https://gosling-lang.github.io/altgosling/)
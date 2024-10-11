---
title: 'Any notebook served: authoring and sharing reusable interactive widgets'
image: anywidget-jupyter-widgets.png
members:
  - trevor-manz
  - nils-gehlenborg
year: 2024
type: article
publisher: 'https://doi.curvenote.com/10.25080/NRPV2311'
doi: 10.25080/NRPV2311
zotero-key: 55VWPUVL
cite:
  authors: 'T Manz, N Gehlenborg, N Abdennur'
  published: '*Proceedings of the 23rd Python in Science Conference*'
videos:
  - title: Conference Presentation
    url: 'https://www.youtube.com/watch?v=CjNSP_yQqrc'
  - title: CHI 2024 Workshop on Human-Notebook Interactions
    url: 'https://www.youtube.com/watch?v=Uzm9_2ZBfxo&feature=youtu.be'
  - title: Tutorial
    url: 'https://www.youtube.com/watch?v=oZhyilx3gqI'
other-resources: []
awards: []
website: 'https://anywidget.dev'
code: 'https://github.com/manzt/anywidget'
preprint: 'https://osf.io/pyn7u'
---
The open-source Jupyter project has fostered a robust ecosystem around notebook-based computing, resulting in diverse Jupyter-compatible platforms (e.g., JupyterLab, Google Colab, VS Code). Jupyter Widgets extend these environments with custom visualizations and interactive elements that communicate directly with user code and data. While this bidirectional communication makes the widget system powerful, its architecture is currently tightly coupled to platforms. As a result, widgets are complex and error-prone to author and distribute, limiting the potential of the wider widget ecosystem. Here we describe the motivation and approach behind the anywidget project, a specification and toolset for portable and reusable web-based widgets in interactive computing environments. It ensures cross-platform compatibility by using the web browser’s built-in module system to load these modules from the notebook kernel. This design simplifies widget authorship and distribution, enables rapid prototyping, and lowers the barrier to entry for newcomers. Anywidget is compatible with not just JCPs but any web-based notebook platform or authoring environment and is already adopted by other projects. Its adoption has sparked a widget renaissance, improving reusability, interoperability, and making interactive computing more accessible.

---
name: HiGlass
active: true

members:
  - peter-kerpedjiev
  - fritz-lekschas
  - chuck-mccallum
  - danielle-nguyen
  - angela-chen
  - nikhil-kumar
  - alaleh-azhir
  - jacob-luber
  - sehi-lyi
  - mark-keller
  - nils-gehlenborg

collaborators:
  - leonid-mirny
  - hanspeter-pfister
  - peter-park

publications:
  - kerpedjiev-2018-genome-biology

gallery:
  higlass.png: 'HiGlass provides synchronized navigation of multiple views showing matrices from different experimental conditions, types or cell lines.'
  higlass-red-diagonal.png: 'Visualizations in HiGlass are highly customizeable with a variety of track types available for displaying genomic contact and other data.'
  higlass-tad-callers.png: 'A comparison of the outputs of seven different TAD callers, shown in HiGlass.'
  higlass-detail-overview.png: 'Customizeable view linking lets users dynamically create detail-overview arrangements for comparing datasets at varying scales.'
  higlass-multivec.png: 'HiGlass now supports multi-vector data, shown here in a stacked bar track view.'


websites:
  - name: HiGlass Demo Site
    description: Website demonstrating the capabilities of HiGlass.
    url: http://higlass.io
    primary: true
  - name: HiGlass Documentation
    description: User and developer documentations for HiGlass.
    url: http://docs.higlass.io/

github_repositories:
  - name: HiGlass Client
    description:
    url: https://github.com/hms-dbmi/higlass
    primary: true
  - name: HiGlass Server
    description:
    url: https://github.com/hms-dbmi/higlass-server
  - name: HiGlass Docker
    description:
    url: https://github.com/hms-dbmi/higlass-docker
  - name: HiGlass Website
    description:
    url: https://github.com/hms-dbmi/higlass-website
  - name: Clodius
    description: A tool to tile 1D and 2D genomic data sets for use with HiGlass.
    url: https://github.com/hms-dbmi/clodius

docker_repositories:
  - name: HiGlass Container
    description:
    url: https://hub.docker.com/r/higlass/higlass-docker/
  - name: Clodius Container
    description:
    url: https://hub.docker.com/r/gehlenborglab/clodius

grants:
  - nih_u01ca200059
  - nih_r00hg007583

blurb:
  - HiGlass is a tool for exploring genomic contact matrices and tracks. It can be configured to explore and compare contact matrices across multiple scales.
---
HiGlass is a web-based viewer for genome interaction maps featuring synchronized navigation of multiple views as well as continuous zooming and panning for navigation across genomic loci and resolutions. It can be used for visual comparison of Hi-C and other genomic data from different experimental conditions to efficiently identify salient outcomes of experimental perturbations, generate new hypotheses, and share the results with the community.

---
name: Discovery
active: true

members:
  - drashko-nakikj
  - nils-gehlenborg
  - karan-luthria 

collaborators:
  - david-kreda

gallery:
  discovery-summary.png: 'High level summary of the patient’s profile and their medical data'
  discovery-catalog.png: 'Patient’s medical data grouped by category and unique labels within those categories'
  discovery-compare.png: 'Patient’s medical data across different providers'
  discovery-timeline.png: 'Patient’s medical data over time'

blurb: "A tool for accessing and visualizing patient information from multiple providers."
---
The goal of Discovery is to raise the awareness of the patient’s medical history and help them prepare for interacting with medical professionals.
Discovery is a product of the [Sync for Science (S4S)](http://syncfor.science/) initiative and represents an open source web application that pulls the information about a patient from multiple providers in a single point of access.
This is achieved through the [SMART on FHIR](https://smarthealthit.org/) protocol developed at our institution.
Discovery then uses different data visualization views to offer the patient an efficient way to explore their medical data.
The patient can get at a high level summary of their data (Summary),
but then take a deeper dive by looking at the data grouped by category and unique labels within those categories (Catalog),
get an insight of which data came from which provider (Compare)
and see how the data looks over time (Timeline)
and what were the expenses associated with their clinical encounters (Payer).

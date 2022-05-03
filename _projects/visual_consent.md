---
name: Data-Driven Visual Consent
active: true

members:
  - nils-gehlenborg
  - undina-gisladottir
  - drashko-nakikj
  - karan-luthria

collaborators:
  - gabriel-brat

resources:

grants:

gallery:
  sdm.png: 'Data-Driven Visual Consent will aid in shared decision making by allowing patients to take an active role in treatment planning.'
  consent.png: 'The current surgical informed process has many limitations that may lead to non-beneficial outcomes.'
  process.png: 'The application utilizes machine learning to calculate risk and renders a visualization based on patient preferences.'
  VisualConsent-ProfileAndRisks.png: 'Specifying the surgery type, patient profile and calculated risks based on that input'
  VisualConsent-RiskPreferences.png: 'Selecting risks that are of biggest concern to the patient'
  VisualConsent-RiskVisualization.png: 'Presenting the risks and discharge destinations to the patient based on their prefered visualization'

blurb: Data-Driven Visual consent is a tool for patients to understand the risk of pursuing a surgical intervention. The application calculates personalized risk scores using patient data and preferences and renders an intuitive visualization.

---

We developed a method for consenting patients before surgery using personalized risk visualizations and accounting for patients’ preferences. The risk calculator takes the type of surgical procedure and personal information for the patient from the EHR system (or manually entered if not available) as an input. At the output, a list of the probabilities for possible complications is provided. Before they can see any of the probabilities for the possible complications, the patient is prompted to select three of those complications that concern them the most. Those will be added to the three complications with highest risk for the patient, and together represented in the final risk visualization. One of the three possible visualizations that is most appealing to the patient gets plugged in the final risk visualization, which also includes the likelihoods for discharge destinations.

In an evaluation study we found that there is not a single preferred risk visualization, but the visualization approach was perceived as desirable and especially promising for raising risk awareness and stimulating discussion with the surgeon.

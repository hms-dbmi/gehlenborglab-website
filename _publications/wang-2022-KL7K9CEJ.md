---
title: 'SurvMaximin: Robust federated approach to transporting survival risk prediction models'
image: wang-2022-KL7K9CEJ.png
image-alt: >-
  Graphical Abstract: Three steps: train local risk prediction models, estimate similarity matrix, transfer learning of
  feature coefficients
members:
  - nils-gehlenborg
  - sehi-lyi
  - mark-keller
year: 2022
type: article
publisher: 'https://linkinghub.elsevier.com/retrieve/pii/S1532046422001873'
doi: 10.1016/j.jbi.2022.104176
cite:
  authors: >-
    X Wang, HG Zhang, X Xiong, C Hong, GM Weber, GA Brat, CL Bonzel, Y Luo, R Duan, NP Palmer, MR Hutch, A
    Gutiérrez-Sacristán, R Bellazzi, L Chiovato, K Cho, A Dagliati, H Estiri, N García-Barrio, R Griffier, DA Hanauer,
    YL Ho, JH Holmes, MS Keller, JG Klann MEng, S L'Yi, S Lozano-Zahonero, SE Maidlow, A Makoudjou, A Malovini, B Moal,
    JH Moore, M Morris, DL Mowery, SN Murphy, A Neuraz, K Yuan Ngiam, GS Omenn, LP Patel, M Pedrera-Jiménez, A Prunotto,
    M Jebathilagam Samayamuthu, FJ Sanz Vidorreta, ER Schriver, P Schubert, P Serrano-Balazote, AM South, ALM Tan, BWL
    Tan, V Tibollo, P Tippmann, S Visweswaran, Z Xia, W Yuan, D Zöller, IS Kohane, P Avillach, Z Guo, T Cai, *The
    Consortium for Clinical Characterization of COVID-19 by EHR (4CE)*
  published: '*Journal of Biomedical Informatics* **134**:104176'
zotero-key: KL7K9CEJ
videos: []
other-resources: []
awards: []
---

## Objective
For multi-center heterogeneous Real-World Data (RWD) with time-to-event outcomes and high-dimensional features, we propose the SurvMaximin algorithm to estimate Cox model feature coefficients for a target population by borrowing summary information from a set of health care centers without sharing patient-level information.

## Materials and Methods
For each of the centers from which we want to borrow information to improve the prediction performance for the target population, a penalized Cox model is fitted to estimate feature coefficients for the center. Using estimated feature coefficients and the covariance matrix of the target population, we then obtain a SurvMaximin estimated set of feature coefficients for the target population. The target population can be an entire cohort comprised of all centers, corresponding to federated learning, or a single center, corresponding to transfer learning.

## Results
Simulation studies and a real-world international electronic health records application study, with 15 participating health care centers across three countries (France, Germany, and the U.S.), show that the proposed SurvMaximin algorithm achieves comparable or higher accuracy compared with the estimator using only the information of the target site and other existing methods. The SurvMaximin estimator is robust to variations in sample sizes and estimated feature coefficients between centers, which amounts to significantly improved estimates for target sites with fewer observations.

## Conclusions
The SurvMaximin method is well suited for both federated and transfer learning in the high-dimensional survival analysis setting. SurvMaximin only requires a one-time summary information exchange from participating centers. Estimated regression vectors can be very heterogeneous. SurvMaximin provides robust Cox feature coefficient estimates without outcome information in the target population and is privacy-preserving.

---
title: Viv Image Visualization Library Preprint Released

members:
  - nils-gehlenborg
  - chuck-mccallum
  - ilan-gold
  - mark-keller
  - trevor-manz
 
publications:
  - manz-2022-viv-nature-methods


blurb: We created a novel solution to directly visualize OME-TIFF files and Bio-Formats-compatible Zarr stores containing highly multiplexed, high-bit depth, and high-resolution image data in the browser.
---

**Update**: Viv is now published in Nature Methods!

Recent advances in highly multiplexed imaging have enabled the comprehensive profiling of complex tissues in healthy and diseased states, facilitating the study of fundamental biology and human disease in spatially-resolved contexts at subcellular resolution. However, current computational infrastructure to distribute and visualize these data on the web remains complex to set up and maintain. 

To address these limitations, we have developed [Viv](https://github.com/hms-dbmi/viv)—an open-source image visualization library for high-resolution multiplexed image data that is implemented in JavaScript and builds on modern web technologies. Viv directly renders Bio-Formats-compatible Zarr and OME-TIFF data formats. 

Three use cases, including integration into Jupyter Notebooks ([https://github.com/hms-dbmi/vizarr](https://github.com/hms-dbmi/vizarr)) and a data portal, as well as an image viewer ([http://avivator.gehlenborglab.org](http://avivator.gehlenborglab.org)) demonstrate the capabilities of our proposed approach.


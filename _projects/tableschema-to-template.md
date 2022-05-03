---
name: tableschema-to-template
active: true

members:
  - chuck-mccallum

websites:
  - name: tableschema-to-template
    description:
    url: https://pypi.org/project/tableschema-to-template/
    primary: true

github_repositories:
  - name: tableschema-to-template
    description:
    url: https://github.com/hubmapconsortium/tableschema-to-template
    primary: true

grants:
  - nih_1Ot2Od026677

blurb: Given a YAML description of the data, generate an Excel template with input validation
---

The [HuBMAP](/research/projects/hubmap/) project will incorporate dozens of different assay types,
each with its own metadata requirements.
While validation at ingest time can prevent bad metadata from entering the system,
that still requires the data submitter to read the error,
open the original TSV, find the corresponding row and column, and make the fix.

We can avoid many data entry mistakes in the first place with input validation in Excel or Google Sheets.
`tableschema-to-template` is a small tool, installable from Pypi,
which takes a [Table Schema](https://specs.frictionlessdata.io/table-schema/) as input,
and returns an Excel template with embedded documentation and some basic validations.
It can be used either as a command-line tool, or as a Python library.

Examples of output can be found in the [HuBMAP `ingest-validation-tools` documentation](https://github.com/hubmapconsortium/ingest-validation-tools/tree/master/docs):
Each directory includes an Excel file generated for that assay type.

# Cloudformation templates 


## Static-site.yaml
Template to create a SSL certificate, S3 buckets, and Cloudfront distribution.
Prerequisite: You must create a Route53 hosted zone prior to running this template.

```
% aws cloudformation create-stack \
--stack-name lab-website \
--template-body file://static-site.yaml \
--profile hdv-admin \
--region us-east-1 \
--parameters ParameterKey=RootDomainName,ParameterValue=hidivelab.org  ParameterKey=HostedZoneId,ParameterValue="<HOSTED_ZONE_ID>"
```


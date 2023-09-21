#!/bin/bash
set -xe


# Copy war file from S3 bucket to tomcat webapp folder
aws s3 sync s3://frontendstack-angularappdeploymentbucket-zx4kl57mv874/apafinance-fe /home/ec2-user/dist/

stack_name="FrontendStack"

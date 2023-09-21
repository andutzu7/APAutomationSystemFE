#!/bin/bash
set -xe


# Copy war file from S3 bucket to tomcat webapp folder
aws s3 cp s3://frontendstack-angularappdeploymentbucket-ls6xy05xzn8v/apafinance-fe /home/ec2-user/dist/apafinance-fe/

stack_name="FrontendStack"

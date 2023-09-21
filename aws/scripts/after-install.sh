#!/bin/bash
set -xe


# Copy war file from S3 bucket to tomcat webapp folder
aws s3 cp --recursive s3://frontendstack-angularappdeploymentbucket-8mu3ljppjrxh/apafinance-fe /home/ec2-user/dist/apafinance-fe/

stack_name="FrontendStack"

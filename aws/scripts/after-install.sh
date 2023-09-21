#!/bin/bash
set -xe


# Copy war file from S3 bucket to tomcat webapp folder
aws s3 sync s3://frontendstack-angularappdeploymentbucket-1jzj3u3sa9cum /home/ec2-user/dist/apafinance-fe/

stack_name="FrontendStack"

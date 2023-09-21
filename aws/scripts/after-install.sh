#!/bin/bash
set -xe


# Copy war file from S3 bucket to tomcat webapp folder
aws s3 cp --recursive s3://frontendstack-angularappdeploymentbucket-zx4kl57mv874/dist /home/ec2-user/

stack_name="FrontendStack"

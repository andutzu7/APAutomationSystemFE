#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-lgsp5xxe9py/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-73ts6y9o06by/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

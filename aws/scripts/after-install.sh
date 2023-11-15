#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-aa0ierwtloqh/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

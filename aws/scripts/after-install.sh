#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-gok2ga013cs7/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

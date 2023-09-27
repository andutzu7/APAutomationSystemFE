#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-19wcdbkyy8e9j/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

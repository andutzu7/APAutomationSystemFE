#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-alg0a4jvlr2j/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

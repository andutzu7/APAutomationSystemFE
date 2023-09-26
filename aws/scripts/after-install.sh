#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-1344cf8sn9lqm/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-wf6myh60vg03/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

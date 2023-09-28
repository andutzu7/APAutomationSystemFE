#!/bin/bash
set -xe

aws s3 sync s3://frontendstack-angularappdeploymentbucket-1itiy9r58udxs/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

#!/bin/bash
set -xe


aws s3 sync s3://frontendstack-angularappdeploymentbucket-tpio9p46l4nc/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

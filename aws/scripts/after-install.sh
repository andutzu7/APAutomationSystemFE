#!/bin/bash
set -xe


aws s3 sync s3://frontendstack-angularappdeploymentbucket-kl3bri00c09f/apafinance-fe/ /home/ec2-user/dist/apafinance-fe/

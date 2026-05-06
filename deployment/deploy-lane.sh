#!/usr/bin/env bash
# Copyright 2005-2025 Kuali, Inc.  All rights reserved.
# Modified in accordance with the license.
#
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: Apache-2.0

# This assumes all of the OS-level configuration has been completed and git repo has already been cloned
# 
# This script should be run from the repo's deployment directory 
# cd deployment 
# ./deploy-lane.sh aws-region lane-name 
# 
# Parameters: 
#  - aws-region: AWS region for deployment
#  - lane-name: Name of the lane for deployment
#
#    For example: ./deploy-lane.sh aws-region lane-name
# 
# Check to see if input has been provided: 
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Please provide the AWS region and lane name for deployment" 
    echo "For example: ./deploy-lane.sh us-west-2 tst" 
    exit 1 
fi 

echo "aws region = $1"
echo "lane name = $2"

echo "------------------------------------------------------------------------------"
echo "[Init] Environment values"
echo "------------------------------------------------------------------------------"

export AWS_REGION=$1
export LANE_NAME=$2
export TEMPLATE_OUTPUT_BUCKET="cdk-hnb659fds-assets-461840362716-us-west-2"
export DIST_OUTPUT_BUCKET="cdk-hnb659fds-assets-461840362716"
export SOLUTION_NAME="security-automations-for-aws-waf-$2"
export VERSION="v4.2.0"

echo "------------------------------------------------------------------------------"
echo "[Test] Run unit tests"
echo "------------------------------------------------------------------------------"

./run-unit-tests.sh

echo "------------------------------------------------------------------------------"
echo "[Build] Build S3 Dist"
echo "------------------------------------------------------------------------------"

./build-s3-dist.sh $TEMPLATE_OUTPUT_BUCKET $DIST_OUTPUT_BUCKET $SOLUTION_NAME $VERSION

echo "------------------------------------------------------------------------------"
echo "[Deploy] Deploy S3 Dist"
echo "------------------------------------------------------------------------------"

./deploy-s3-dist.sh $TEMPLATE_OUTPUT_BUCKET $DIST_OUTPUT_BUCKET $SOLUTION_NAME $VERSION

echo "------------------------------------------------------------------------------"
echo "[Deploy] Deploy CDK"
echo "------------------------------------------------------------------------------"

./deploy-cdk.sh $TEMPLATE_OUTPUT_BUCKET $DIST_OUTPUT_BUCKET $SOLUTION_NAME $VERSION

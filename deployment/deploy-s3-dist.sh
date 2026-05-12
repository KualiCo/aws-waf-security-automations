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
# ./deploy-s3-dist.sh source-bucket-base-name trademarked-solution-name version-code 
# 
# Parameters: 
#  - template-bucket: Name for the S3 bucket location where the templates are found
#  - source-bucket-base-name: Name for the S3 bucket location where the Lambda source 
#    code is deployed. The template will append '-[region_name]' to this bucket name.
#  - trademarked-solution-name: name of the solution for consistency 
#  - version-code: version of the package 
#
#    For example: ./deploy-s3-dist.sh template-bucket source-bucket-base-name my-solution v3.0
#    The template will then expect the source code to be located in the solutions-[region_name] bucket 
# 
# Check to see if input has been provided: 
if [ -z "$1" ] || [ -z "$2" ] || [ -z "$3" ] || [ -z "$4" ]; then
    echo "Please provide the base template-bucket, source-bucket-base-name, trademark-approved-solution-name (including lane) and version" 
    echo "For example: ./deploy-s3-dist.sh cdk-hnb659fds-assets-461840362716-us-west-2 cdk-hnb659fds-assets-461840362716 security-automations-for-aws-waf-tst v4.2.0" 
    exit 1 
fi 

echo "template bucket = $1"
echo "source bucket = $2"
echo "solution = $3"
echo "version = $4"

# Get reference for all important folders
template_dir="$PWD"

source_dir="$(cd $PWD/../source; pwd -P)"
resource_dir="$source_dir/infrastructure"
staging_dist_dir="$template_dir/staging"

# There are now TWO dist directories
template_dist_dir="$template_dir/global-s3-assets"
build_dist_dir="$template_dir/regional-s3-assets"

echo "------------------------------------------------------------------------------"
echo "[Init] Environment values"
echo "------------------------------------------------------------------------------"

export TEMPLATE_OUTPUT_BUCKET=$1
export DIST_OUTPUT_BUCKET=$2
export SOLUTION_NAME=$3
export VERSION=$4

if [[ -z "$SOLUTION_NAME" ]]; then
    export SOLUTION_NAME='security-automations-for-aws-waf'
fi

echo "------------------------------------------------------------------------------"
echo "[Deploy] Copy to S3"
echo "------------------------------------------------------------------------------"

aws s3 cp ./global-s3-assets s3://$TEMPLATE_OUTPUT_BUCKET/$SOLUTION_NAME/$VERSION --recursive --acl bucket-owner-full-control
aws s3 cp ./regional-s3-assets s3://$DIST_OUTPUT_BUCKET-$AWS_REGION/$SOLUTION_NAME/$VERSION --recursive --acl bucket-owner-full-control

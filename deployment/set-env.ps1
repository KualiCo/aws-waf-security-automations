# Copyright 2005-2025 Kuali, Inc.  All rights reserved.

param(
    [string]$AwsRegion,
    [string]$LaneName
)

Set-Item Env:/TEMPLATE_OUTPUT_BUCKET -Value "cdk-hnb659fds-assets-461840362716-us-west-2" # Name of the global bucket where CloudFormation templates are stored
Set-Item Env:/DIST_OUTPUT_BUCKET -Value "cdk-hnb659fds-assets-461840362716" # Name for the regional bucket where regional assets are stored
Set-Item Env:/SOLUTION_NAME -Value "security-automations-for-aws-waf-$LaneName" # name of the solution, including the lane.
Set-Item Env:/LANE_NAME -Value $LaneName # name of the lane
Set-Item Env:/VERSION -Value "v4.2.0" # version number for the customized code
Set-Item Env:/AWS_REGION -Value $AwsRegion # region where the solution is deployed

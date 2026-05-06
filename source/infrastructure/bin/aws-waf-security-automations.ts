// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { App, Aspects, DefaultStackSynthesizer } from "aws-cdk-lib";
import { AwsWafSecurityAutomationsStack } from "../lib/aws-waf-security-automations-stack";
import { CfnGuardSuppressResourceList } from "../lib/utils/appUtils";

const app = new App();

const tstStack = new AwsWafSecurityAutomationsStack(
  app,
  'ops-waf-net-uw2-tst-waf',
  {
    analyticsReporting: false, // CDK::Metadata breaks deployment in some regions
    synthesizer: new DefaultStackSynthesizer({
      generateBootstrapVersionRule: false, // We don't need an extra CFN parameter for the Bootstrap version
    }),
  },
);

const prdStack = new AwsWafSecurityAutomationsStack(
  app,
  'ops-waf-net-uw2-prd-waf',
  {
    analyticsReporting: false, // CDK::Metadata breaks deployment in some regions
    synthesizer: new DefaultStackSynthesizer({
      generateBootstrapVersionRule: false, // We don't need an extra CFN parameter for the Bootstrap version
    }),
  },
);

const resourceSuppressions = {
  "AWS::IAM::Role": ["IAM_NO_INLINE_POLICY_CHECK"],
  "AWS::Lambda::Function": ["LAMBDA_INSIDE_VPC", "LAMBDA_CONCURRENCY_CHECK"],
  "AWS::Logs::LogGroup": [
    "CLOUDWATCH_LOG_GROUP_ENCRYPTED",
    "CW_LOGGROUP_RETENTION_PERIOD_CHECK",
  ],
};

Aspects.of(tstStack).add(new CfnGuardSuppressResourceList(resourceSuppressions));
Aspects.of(prdStack).add(new CfnGuardSuppressResourceList(resourceSuppressions));

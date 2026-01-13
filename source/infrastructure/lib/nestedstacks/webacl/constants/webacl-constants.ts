// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  manifest,
  distVersion,
  solutionId,
} from "../../../constants/waf-constants";

export const webaclManifest = {
  webacl: {
    description: `(${solutionId}-WebACL) - Security Automations for AWS WAF: This AWS CloudFormation template helps you provision the Security Automations for AWS WAF stack without worrying about creating and configuring the underlying AWS infrastructure. **WARNING** This template creates an AWS WAF Web ACL and Amazon CloudWatch custom metrics. You will be billed for the AWS resources used if you create a stack from this template. ${distVersion}`,
  },
  ...manifest,
};

/**
 * The list of IPv4 addresses for the WAFv4 whitelist set.
 * These are typically the IP addresses of trusted services that need to bypass certain WAF rules.
 * For example, external monitoring services or internal applications (and their NAT gateways).
 */
export const wafWhitelistSetV4Addresses = [
  "52.35.176.121/32", // UW2 Legacy Prod NAT Gateway IP
  "50.112.66.144/32", // UW2 Legacy Non-Prod NAT Gateway IP
];

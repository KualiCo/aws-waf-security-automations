// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { Construct } from "constructs";
import { CfnParameter, Stack } from "aws-cdk-lib";

export interface TemplateMetadataProps {
  parameters: { [key: string]: CfnParameter };
  templateFormatVersion: string;
  description: string;
}

export class WafMetadata extends Construct {
  constructor(scope: Construct, id: string, props: TemplateMetadataProps) {
    super(scope, id);

    const metadata = {
      "AWS::CloudFormation::Interface": {
        ParameterGroups: [
          {
            Label: { default: "Resource Type" },
            Parameters: [props.parameters.endpointType.logicalId],
          },
          {
            Label: { default: "AWS Managed IP Reputation Rule Groups" },
            Parameters: [
              props.parameters.activateAWSManagedIPR.logicalId,
              props.parameters.actionForAWSManagedIPR.logicalId,
              props.parameters.activateAWSManagedAIP.logicalId,
              props.parameters.actionForAWSManagedAIP.logicalId,
            ],
          },
          {
            Label: { default: "AWS Managed Baseline Rule Groups" },
            Parameters: [
              props.parameters.activateAWSManagedRules.logicalId,
              props.parameters.actionForAWSManagedRules.logicalId,
              props.parameters.activateAWSManagedAP.logicalId,
              props.parameters.actionForAWSManagedAP.logicalId,
              props.parameters.activateAWSManagedKBI.logicalId,
              props.parameters.actionForAWSManagedKBI.logicalId,
            ],
          },
          {
            Label: { default: "AWS Managed Use-case Specific Rule Groups" },
            Parameters: [
              props.parameters.activateAWSManagedSQL.logicalId,
              props.parameters.actionForAWSManagedSQL.logicalId,
              props.parameters.activateAWSManagedLinux.logicalId,
              props.parameters.actionForAWSManagedLinux.logicalId,
              props.parameters.activateAWSManagedPOSIX.logicalId,
              props.parameters.actionForAWSManagedPOSIX.logicalId,
              props.parameters.activateAWSManagedWindows.logicalId,
              props.parameters.actionForAWSManagedWindows.logicalId,
              props.parameters.activateAWSManagedPHP.logicalId,
              props.parameters.actionForAWSManagedPHP.logicalId,
              props.parameters.activateAWSManagedWP.logicalId,
              props.parameters.actionForAWSManagedWP.logicalId,
            ],
          },
          {
            Label: { default: "Custom Rule - Scanner & Probes" },
            Parameters: [
              props.parameters.activateScannersProbesProtection.logicalId,
              props.parameters.actionForScannersProbesProtection.logicalId,
              props.parameters.appAccessLogBucket.logicalId,
              props.parameters.appAccessLogBucketPrefix.logicalId,
              props.parameters.appAccessLogBucketLoggingStatus.logicalId,
              props.parameters.errorThreshold.logicalId,
              props.parameters.keepDataInOriginalS3Location.logicalId,
            ],
          },
          {
            Label: { default: "Custom Rule - HTTP Flood" },
            Parameters: [
              props.parameters.activateHttpFloodProtection.logicalId,
              props.parameters.actionForHttpFloodProtection.logicalId,
              props.parameters.requestThreshold.logicalId,
              props.parameters.requestThresholdByCountry.logicalId,
              props.parameters.httpFloodAthenaQueryGroupBy.logicalId,
              props.parameters.wafBlockPeriod.logicalId,
              props.parameters.athenaQueryRunTimeSchedule.logicalId,
              props.parameters.wafRuleKeysType.logicalId,
              props.parameters.customHeaderName.logicalId,
              props.parameters.timeWindowThreshold.logicalId,
            ],
          },
          {
            Label: { default: "Custom Rule - Bad Bot" },
            Parameters: [
              props.parameters.activateBadBotProtection.logicalId,
              props.parameters.actionForBadBotProtection.logicalId,
            ],
          },
          {
            Label: { default: "Custom Rule - Third Party IP Reputation Lists" },
            Parameters: [
              props.parameters.activateReputationListsProtection.logicalId,
              props.parameters.actionForReputationListsProtection.logicalId,
            ],
          },
          {
            Label: { default: "Legacy Custom Rules" },
            Parameters: [
              props.parameters.activateSqlInjectionProtection.logicalId,
              props.parameters.actionForSqlInjectionProtection.logicalId,
              props.parameters.sqlInjectionProtectionSensitivityLevel.logicalId,
              props.parameters.activateCrossSiteScriptingProtection.logicalId,
              props.parameters.actionForCrossSiteScriptingProtection.logicalId,
            ],
          },
          {
            Label: { default: "Allowed and Denied IP Retention Settings" },
            Parameters: [
              props.parameters.ipRetentionPeriodAllowed.logicalId,
              props.parameters.ipRetentionPeriodDenied.logicalId,
              props.parameters.snsEmail.logicalId,
            ],
          },
          {
            Label: { default: "Advanced Settings" },
            Parameters: [props.parameters.logGroupRetention.logicalId],
          },
        ],

        ParameterLabels: {
          [props.parameters.activateAWSManagedRules.logicalId]: {
            default: "Activate Core Rule Set Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedAP.logicalId]: {
            default: "Activate Admin Protection Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedKBI.logicalId]: {
            default: "Activate Known Bad Inputs Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedIPR.logicalId]: {
            default:
              "Activate Amazon IP reputation List Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedAIP.logicalId]: {
            default: "Activate Anonymous IP List Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedSQL.logicalId]: {
            default: "Activate SQL Database Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedLinux.logicalId]: {
            default:
              "Activate Linux Operating System Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedPOSIX.logicalId]: {
            default:
              "Activate POSIX Operating System Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedWindows.logicalId]: {
            default:
              "Activate Windows Operating System Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedPHP.logicalId]: {
            default: "Activate PHP Application Managed Rule Group Protection",
          },
          [props.parameters.activateAWSManagedWP.logicalId]: {
            default:
              "Activate WordPress Application Managed Rule Group Protection",
          },
          [props.parameters.activateSqlInjectionProtection.logicalId]: {
            default: "Activate SQL Injection Protection",
          },
          [props.parameters.sqlInjectionProtectionSensitivityLevel.logicalId]: {
            default: "Sensitivity Level for SQL Injection Protection",
          },
          [props.parameters.activateCrossSiteScriptingProtection.logicalId]: {
            default: "Activate Cross-site Scripting Protection",
          },
          [props.parameters.activateHttpFloodProtection.logicalId]: {
            default: "Activate HTTP Flood Protection",
          },
          [props.parameters.activateScannersProbesProtection.logicalId]: {
            default: "Activate Scanner & Probe Protection",
          },
          [props.parameters.activateReputationListsProtection.logicalId]: {
            default: "Activate Reputation List Protection",
          },
          [props.parameters.activateBadBotProtection.logicalId]: {
            default: "Activate Bad Bot Protection",
          },
          [props.parameters.actionForAWSManagedRules.logicalId]: {
            default: "Core Rule Set Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedAP.logicalId]: {
            default: "Admin Protection Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedKBI.logicalId]: {
            default: "Known Bad Inputs Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedIPR.logicalId]: {
            default:
              "Amazon IP reputation List Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedAIP.logicalId]: {
            default: "Anonymous IP List Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedSQL.logicalId]: {
            default: "SQL Database Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedLinux.logicalId]: {
            default:
              "Linux Operating System Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedPOSIX.logicalId]: {
            default:
              "POSIX Operating System Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedWindows.logicalId]: {
            default:
              "Windows Operating System Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedPHP.logicalId]: {
            default: "PHP Application Managed Rule Group Protection Action",
          },
          [props.parameters.actionForAWSManagedWP.logicalId]: {
            default:
              "WordPress Application Managed Rule Group Protection Action",
          },
          [props.parameters.actionForSqlInjectionProtection.logicalId]: {
            default: "SQL Injection Protection Action",
          },
          [props.parameters.sqlInjectionProtectionSensitivityLevel.logicalId]: {
            default: "Sensitivity Level for SQL Injection Protection",
          },
          [props.parameters.actionForCrossSiteScriptingProtection.logicalId]: {
            default: "Cross-site Scripting Protection Action",
          },
          [props.parameters.actionForHttpFloodProtection.logicalId]: {
            default: "HTTP Flood Protection Action",
          },
          [props.parameters.actionForScannersProbesProtection.logicalId]: {
            default: "Scanner & Probe Protection Action",
          },
          [props.parameters.actionForReputationListsProtection.logicalId]: {
            default: "Reputation List Protection Action",
          },
          [props.parameters.actionForBadBotProtection.logicalId]: {
            default: "Bad Bot Protection Action",
          },
          [props.parameters.endpointType.logicalId]: { default: "Endpoint" },
          [props.parameters.appAccessLogBucket.logicalId]: {
            default: "Application Access Log Bucket Name",
          },
          [props.parameters.appAccessLogBucketPrefix.logicalId]: {
            default: "Application Access Log Bucket Prefix",
          },
          [props.parameters.appAccessLogBucketLoggingStatus.logicalId]: {
            default: "Is bucket access logging turned on?",
          },
          [props.parameters.errorThreshold.logicalId]: {
            default: "Error Threshold",
          },
          [props.parameters.requestThreshold.logicalId]: {
            default: "Default Request Threshold",
          },
          [props.parameters.requestThresholdByCountry.logicalId]: {
            default: "Request Threshold by Country",
          },
          [props.parameters.httpFloodAthenaQueryGroupBy.logicalId]: {
            default: "Group By Requests in HTTP Flood Athena Query",
          },
          [props.parameters.wafBlockPeriod.logicalId]: {
            default: "WAF Block Period",
          },
          [props.parameters.athenaQueryRunTimeSchedule.logicalId]: {
            default: "Athena Query Run Time Schedule (Minute)",
          },
          [props.parameters.keepDataInOriginalS3Location.logicalId]: {
            default: "Keep Data in Original S3 Location",
          },
          [props.parameters.ipRetentionPeriodAllowed.logicalId]: {
            default: "Retention Period (Minutes) for Allowed IP Set",
          },
          [props.parameters.ipRetentionPeriodDenied.logicalId]: {
            default: "Retention Period (Minutes) for Denied IP Set",
          },
          [props.parameters.snsEmail.logicalId]: {
            default:
              "Email for receiving notification upon Allowed or Denied IP Sets expiration",
          },
          [props.parameters.logGroupRetention.logicalId]: {
            default: "Retention Period (Days) for Log Groups",
          },
          [props.parameters.wafRuleKeysType.logicalId]: {
            default: "Rule Keys",
          },
          [props.parameters.customHeaderName.logicalId]: {
            default: "Rule Keys Custom Header",
          },
          [props.parameters.timeWindowThreshold.logicalId]: {
            default: "Time Window Threshold (Minutes)",
          },
        },
      },
    };

    const stack = Stack.of(this);
    stack.templateOptions.templateFormatVersion = props.templateFormatVersion;
    stack.templateOptions.description = props.description;
    stack.templateOptions.metadata = {
      ...stack.templateOptions.metadata,
      "AWS::CloudFormation::Interface":
        metadata["AWS::CloudFormation::Interface"],
    };
  }
}

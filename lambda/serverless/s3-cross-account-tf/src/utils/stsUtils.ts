import {
  AssumeRoleCommand,
  AssumeRoleCommandInput,
  STSClient,
} from '@aws-sdk/client-sts'

const stsClient = new STSClient()

export const assumeRole = async (roleArn: string, externalId?: string) => {
  const params: AssumeRoleCommandInput = {
    RoleArn: roleArn,
    RoleSessionName: 'S3AssumeRoleSession',
    ExternalId: externalId,
  }

  const command: AssumeRoleCommand = new AssumeRoleCommand(params)
  const response = await stsClient.send(command)
  return response
}

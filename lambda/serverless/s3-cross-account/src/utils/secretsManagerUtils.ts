import {
  GetSecretValueCommand,
  SecretsManagerClient,
} from '@aws-sdk/client-secrets-manager'

export const getSecretValue = async (secretId: string) => {
  const input = {
    SecretId: secretId,
  }
  const command = new GetSecretValueCommand(input)
  const client = new SecretsManagerClient()
  const response = await client.send(command)
  return response
}

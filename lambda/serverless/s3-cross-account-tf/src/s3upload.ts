import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import {
  copyAllBetweenCrossBuckets,
  client,
  clientFromInput,
  getBucketKeys,
} from './utils/s3Utils'
import { assumeRole } from './utils/stsUtils'

/*
 * AWS Lambda
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<any> => {
  console.log(`event: ${JSON.stringify(event)}`)

  try {
    const sourceBucket = process.env.sourceBucket as string
    const destBucket = process.env.destBucket as string

    const roleArn = process.env.roleArn as string
    const response = await assumeRole(roleArn)
    console.log(`sts : ${JSON.stringify(response)}`)

    const key1 = response?.Credentials?.AccessKeyId as string
    const key2 = response?.Credentials?.SecretAccessKey as string

    console.log(`key1: ${key1}, key2: ${key2}`)

    // const sourceClient = clientFromInput(key1, key2)
    const sourceClient = client()
    const destClient = client()

    const result = await getBucketKeys(sourceBucket, sourceClient)
    console.log(`keys:: ${result}`)

    // const result = await copyAllBetweenCrossBuckets(
    //   sourceBucket,
    //   destBucket,
    //   sourceClient,
    //   destClient
    // )

    console.log(`finished sync..... result: ${result}`)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.log(`Error in S3 sync is : ${JSON.stringify(error)}`)
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

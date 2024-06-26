import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import {
  clientFromInput,
  copyAllBetweenBuckets,
  copyAllBetweenCrossBuckets,
  client,
  getBucketKeys,
  upload,
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
    // await upload()
    // const keys = await getBucketKeys(sourceBucket)
    // console.log(`keys : ${keys}`)
    const roleArn = process.env.roleArn as string
    const response = await assumeRole(roleArn)
    console.log(`sts : ${JSON.stringify(response)}`)

    const key1 = response?.Credentials?.AccessKeyId as string
    const key2 = response?.Credentials?.SecretAccessKey as string

    const sourceBucket = process.env.sourceBucket as string
    const destBucket = process.env.destBucket as string

    const region = 'eu-west-2'
    // const sourceClient = clientFromInput(key1, key2, region)
    const sourceClient = client() // TODO:
    const destClient = client() // default

    const result = await copyAllBetweenCrossBuckets(
      sourceBucket,
      destBucket,
      sourceClient,
      destClient
    )
    // const result = await copyAllBetweenBuckets(sourceBucket, destBucket)
    console.log(`finished sync..... result: ${result}`)
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    }
  } catch (error) {
    console.log(`Error in S3 sync is : ${error}`)
    console.log(`Error in S3 sync is : ${JSON.stringify(error)}`)

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }
}

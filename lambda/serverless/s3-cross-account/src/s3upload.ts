import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { copyAllBetweenBuckets, getBucketKeys, upload } from './utils/s3Utils'

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
    const sourceBucket = 'jjaybucket2'
    const destBucket = 'jjays3crossbucket'
    // const keys = await getBucketKeys(sourceBucket)
    // console.log(`keys : ${keys}`)

    const result = await copyAllBetweenBuckets(sourceBucket, destBucket)
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

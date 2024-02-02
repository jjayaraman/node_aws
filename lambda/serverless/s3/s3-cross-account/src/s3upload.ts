import { APIGatewayProxyEvent, Context } from 'aws-lambda'
import { upload } from './utils/s3Utils'

/*
 * AWS Lambda
 */
export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<any> => {
  console.log(`event: ${event}, context:${context}`)

  try {
    await upload()
    console.log(`finished.....`)
  } catch (error) {
    console.log(error)

    return {
      statusCode: 500,
      body: JSON.stringify(error),
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify('File uploaded successfully'),
  }
}

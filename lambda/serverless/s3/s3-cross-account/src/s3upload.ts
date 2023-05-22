import { APIGatewayProxyEvent, Context } from 'aws-lambda'

export const handler = async (
  event: APIGatewayProxyEvent,
  context: Context
): Promise<any> => {
  console.log(`event: ${event}, context:${context}`)

  return {
    statusCode: 200,
    body: JSON.stringify('Hello, world!'),
  }
}

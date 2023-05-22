import { APIGatewayProxyEvent, Context } from 'aws-lambda'

export const handler = (event: APIGatewayProxyEvent, context: Context) => {
  console.log(`event: ${event}, context:${context}`)

  return {
    statusCode: 200,
    body: JSON.stringify('Hello, world! '),
  }
}

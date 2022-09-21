import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
/**
 * Lambda authoriser
 * 
 * Ref: https://www.serverless.com/framework/docs/providers/aws/events/http-api/
 * 
 * @param event 
 * @returns 
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('event :: ', JSON.stringify(event));

    const result = {
        'message': 'Hello authorizer'
    }

    let respone: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(result)
    }

    return respone
}
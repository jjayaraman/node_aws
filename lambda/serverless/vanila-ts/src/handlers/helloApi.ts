import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log('event :: ', JSON.stringify(event));

    const result = {
        'message': 'Hello Lambda to test the Lambda authorizer'
    }

    let respone: APIGatewayProxyResult = {
        statusCode: 200,
        body: JSON.stringify(result)
    }

    return respone
}
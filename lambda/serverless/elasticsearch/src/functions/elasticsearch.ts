import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';


export const search = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    return {
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify('hello.. lambda.'),
    }
};
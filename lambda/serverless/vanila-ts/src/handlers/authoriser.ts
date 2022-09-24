import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
/**
 * Lambda authoriser
 * 
 * Ref: https://www.serverless.com/framework/docs/providers/aws/events/http-api/
 * 
 * @param event 
 * @returns 
 */
export const handler = async (event: any): Promise<any> => {

    console.log('event :: ', JSON.stringify(event));

    const token = event.token
    const methodArn = event.methodArn

    let effect = 'deny'
    if (token && token === 'jay') {
        effect = 'allow'
    }

    const policyDocument = {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Action": "execute-api:Invoke",
                "Effect": effect,
                "Resource": methodArn
            }
        ]
    }

    let respone = {
        policyDocument
    }

    return respone
}
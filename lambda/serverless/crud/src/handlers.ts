import AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from 'uuid';

const documentClient = new AWS.DynamoDB.DocumentClient();

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const body = event.body as String

  await documentClient.put({
    TableName: 'Users',
    Item: {
      userId: v4(),
      ...body
    }
  }).promise()

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  };
};

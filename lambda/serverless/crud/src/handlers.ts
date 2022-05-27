import AWS from 'aws-sdk';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { v4 } from 'uuid';

const documentClient = new AWS.DynamoDB.DocumentClient();

const headers = {
  'Content-type': 'application/json'
}

export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('event :: ', JSON.stringify(event));
  const user = event.body as String
  console.log('Creating user : ', user);

  const putItem = {
    TableName: 'Users',
    Item: {
      userId: v4(),
      details: user
    }
  }

  let statusCode = 200;
  let body = ''
  await documentClient.put(putItem, (err, data) => {
    if (err) {
      console.error(err)
      statusCode = 500
      body = `An error occured when creating a user ${user}`
    }
    statusCode = 200;
    body = JSON.stringify(user)
  }).promise()

  return {
    statusCode,
    body,
    headers
  };
};



export const getAllUsers = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('event :: ', JSON.stringify(event));

  let statusCode = 200;
  let body = ''

  await documentClient.scan({ TableName: 'Users' }, (err, data) => {
    if (err) {
      console.error(err)
      statusCode = 500
      body = `An error occured when trying to read all users`
    }
    console.log('getAllUsers : ', data);
    body = JSON.stringify(data, null, 2);
  }).promise();


  return {
    statusCode,
    body,
    headers
  }
}


export const deleteUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('event :: ', JSON.stringify(event));
  const userId = event.pathParameters?.userId

  let statusCode = 200;
  let body = '';

  const deleteInputItem = {
    TableName: 'Users',
    Key: { userId }
  }

  console.log('deleteInputItem : ', deleteInputItem)

  await documentClient.delete(deleteInputItem, (err, data) => {
    if (err) {
      statusCode = 500
      body = `Failed to delete User ${userId}`;
      console.error(err)
    }
    body = `User ${userId} successfully deleted`;

  }).promise();

  return {
    statusCode,
    body,
    headers
  }
}
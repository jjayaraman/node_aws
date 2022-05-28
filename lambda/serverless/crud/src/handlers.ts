import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 } from 'uuid';
import User from "./model/User";
import UserService from './service/UserService';

const documentClient = new DocumentClient();
const userService = new UserService(documentClient);


const headers = {
  'Content-type': 'application/json'
}


export const createUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('event :: ', JSON.stringify(event));

  let statusCode = 200;
  let body = ''
  let user = populateUserModel(event);
  console.log("populated user: ", JSON.stringify(user));

  await userService.createUser(user).then(data => {
    statusCode = 200;
    body = JSON.stringify(user)
    console.log('data is: ', JSON.stringify(data));
    console.log('body is: ', body);

  }).catch(err => {
    statusCode = 500
    body = `An error occured when creating a user ${user}`
    console.error(err)
  });

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
  const id = event.pathParameters?.id

  let statusCode = 200;
  let body = '';

  const deleteInputItem = {
    TableName: 'Users',
    Key: { id }
  }

  console.log('deleteInputItem : ', deleteInputItem)

  await documentClient.delete(deleteInputItem, (err, data) => {
    if (err) {
      statusCode = 500
      body = `Failed to delete User ${id}`;
      console.error(err)
    }
    body = `User ${id} successfully deleted`;

  }).promise();

  return {
    statusCode,
    body,
    headers
  }
}

function populateUserModel(event: APIGatewayProxyEvent) {
  let body: User = JSON.parse(event.body);

  const user: User = {
    id: v4(),
    name: body.name,
    age: 0,
    email: body.email,
    homeAddress: undefined,
    workAddress: undefined
  }
  return user;
}

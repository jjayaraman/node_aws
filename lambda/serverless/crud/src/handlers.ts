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
    body = JSON.stringify(data)
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

  await userService.getAllUsers().then(users => {
    console.log('getAllUsers : ', users);
    body = JSON.stringify(users, null, 2);
  }).catch(err => {
    console.error(err)
    statusCode = 500
    body = `An error occured when trying to read all users`
  });

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

  if (id) {
    try {
      await userService.deleteUser(id);
      statusCode = 200;
      body = `User ${id} successfully deleted`;
    } catch (error) {
      statusCode = 500;
      body = `Failed to delete User ${id}`;
    }
  } else {
    statusCode = 400;
    body = `Not a valid user id :  ${id}`;
  }
  return {
    statusCode,
    body,
    headers
  }
}

function populateUserModel(event: APIGatewayProxyEvent) {
  if (!event.body) {
    throw new Error("Empty body received");
  }

  let body: User = JSON.parse(event.body);

  const user: User = {
    id: v4(),
    name: body.name,
    age: body.age,
    email: body.email,
    homeAddress: body.homeAddress,
    workAddress: body.workAddress
  }
  return user;
}

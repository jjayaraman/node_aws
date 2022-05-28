import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import User from '../model/User'
export default class UserService {

    constructor(private documentClient: DocumentClient) { }

    USER_TABLE = process.env.DYNAMODB_USERS_TABLE || 'Users'

    createUser = async (user: User): Promise<User> => {
        console.log('user data received', JSON.stringify(user));

        const putItem = {
            TableName: this.USER_TABLE,
            Item: user
        }

        await this.documentClient.put(putItem, (err, data) => {
            if (err) throw err
            console.log('User created successfully');
        }).promise();

        return user as User;
    }


    updateUser = async (id: string, user: User) => {

        const updateItemInput = {
            TableName: this.USER_TABLE,
            Key: { id }
        }
        return await this.documentClient.update(updateItemInput, (err, result) => {
            if (err) throw err;
        }).promise();

    }

    getAllUsers = async (): Promise<Array<User>> => {
        const users = await this.documentClient.scan({ TableName: this.USER_TABLE }, (err, data) => {
            if (err) throw err
        }).promise();

        return users.Items as User[]
    }


    deleteUser = async (id: string): Promise<any> => {
        const deleteItemInput = {
            TableName: this.USER_TABLE,
            Key: { id }
        }
        return await this.documentClient.delete(deleteItemInput, (err, data) => {
            if (err) throw err
            console.log('delete item : ' + JSON.stringify(data));

        }).promise();
    }
}
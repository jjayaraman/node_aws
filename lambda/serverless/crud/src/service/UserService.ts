import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import User from '../model/User'
export default class UserService {

    constructor(private documentClient: DocumentClient) { }


    createUser = async (user: User): Promise<User> => {
        console.log('user data received', JSON.stringify(user));

        const putItem = {
            TableName: 'Users',
            Item: user
        }

        await this.documentClient.put(putItem, (err, data) => {
            if (err) throw err
            console.log('User created successfully');
        }).promise();

        return user as User;
    }


}

import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { sign, SignOptions } from 'jsonwebtoken';

export const login = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

    console.log(`event : ${JSON.stringify(event)}`);
    const body = JSON.parse(event.body as string);

    const username = body?.username || 'jay'
    const password = body?.password || 'jay'

    let response: APIGatewayProxyResult = {
        statusCode: 200,
        body: ''
    }

    await authenticate(username, password)
        .then(token => {
            console.log(`token:  ${token}`);
            response = {
                statusCode: 200,
                body: JSON.stringify({ token })
            };
        })
        .catch(error => {
            response = {
                statusCode: 401,
                body: `Invalid credentials. Please try again`
            };
        })

    return response;
}


// Dummy authentication
const authenticate = async (username: string, password: string): Promise<string> => {
    if (username && password) {
        if (username === 'jay' && password === 'jay') {
            const payload = { username }
            const SECRET = process.env.SECRET as string
            const options: SignOptions = {
                algorithm: 'HS256',
                expiresIn: '60',
                issuer: 'jay',
                audience: 'lambda',
            }

            const token = sign(payload, SECRET, options);
            return token;
        }
    }
    return Promise.reject('Invalid credentials')
}

import { sign, SignOptions } from 'jsonwebtoken';

export const login = (event: any) => {

    console.log(`event : ${JSON.stringify(event)}`);

    const username = event.body.username || 'jay'
    const password = event.body.password || 'jay'

    // Dummy authentication
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
            console.log(`token:  ${token}`);
            return {
                statusCode: 200,
                body: JSON.stringify(token)
            };
        }
    }

    return {
        statusCode: 401,
        body: `Invalid credentials. Please try again`
    };
}
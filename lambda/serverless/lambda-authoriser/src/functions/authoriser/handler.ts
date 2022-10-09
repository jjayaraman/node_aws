import { verify, VerifyOptions } from "jsonwebtoken";

export const authoriser = async (event: any) => {
    console.log(typeof event);

    console.log(`event : ${JSON.stringify(event)}`);
    console.log(`event : ${JSON.stringify(event.headers)}`);

    let token = event.headers['authorization']
    token = token.replace(/^Bearer\s+/, "");  // Remove Bearer from string

    const ACCOUNT_ID = process.env.ACCOUNT_ID
    const REGION = process.env.REGION
    const API_ID = process.env.API_ID
    const JWT_SECRET = process.env.JWT_SECRET as string

    let effect = 'Deny' // Allow|Deny
    const options: VerifyOptions = {
        algorithms: ['HS256'],
        issuer: 'jay',
        audience: 'lambda',
    }

    verify(token, JWT_SECRET, options, (err, result) => {
        if (err) {
            console.log('Validation error: ' + JSON.stringify(err));
            effect = 'Deny';
        }
        else {
            effect = 'Allow';
            console.log(`JWT verfied successfully. result: ${JSON.stringify(result)}`);
        }
    })

    const policyDocument = {
        "principalId": "abcdef", // The principal user identification associated with the token sent by the client.
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": effect,
                    "Action": "execute-api:Invoke",
                    "Resource": `arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:${API_ID}/*`
                }
            ]
        },
        "context": {
            "exampleKey": "exampleValue"
        }
    }

    console.log(`policyDocument: ${JSON.stringify(policyDocument)}`);
    return policyDocument
}
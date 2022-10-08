
export const authoriser = (event: any) => {

    console.log(`event : ${event}`);

    let effect = 'Deny' // Allow|Deny
    effect = event.body.effect || 'Deny'

    const ACCOUNT_ID = process.env.ACCOUNT_ID
    const REGION = process.env.REGION

    const policyDocument = {
        "principalId": "abcdef", // The principal user identification associated with the token sent by the client.
        "policyDocument": {
            "Version": "2012-10-17",
            "Statement": [
                {
                    "Effect": effect,
                    "Action": "execute-api:Invoke",
                    "Resource": `arn:aws:execute-api:${REGION}:${ACCOUNT_ID}:a44ifg75kf/*/GET/`
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
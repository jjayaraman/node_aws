import { GetObjectCommand, ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';

const s3Client = new S3Client({})

const BUCKET_NAME = process.env.BUCKET_NAME

export const get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('BUCKET_NAME : ', BUCKET_NAME)

    const params = { Bucket: BUCKET_NAME }
    const getObjectCommand = new ListObjectsCommand(params)
    const data = await s3Client.send(getObjectCommand)
    console.log('data loaded : ', data);


    return {
        'statusCode': 200,
        'body': JSON.stringify(data)
    }
}
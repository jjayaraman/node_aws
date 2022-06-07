import { S3Client } from '@aws-sdk/client-s3';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import S3Service from '../service/s3Service';

const BUCKET_NAME = process.env.BUCKET_NAME as string;

const s3Client = new S3Client({})
const s3Service = new S3Service(s3Client)

export const get = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    console.log('BUCKET_NAME : ', BUCKET_NAME)

    let data;
    try {
        data = await s3Service.listObjects(BUCKET_NAME)
        console.log('data loaded : ', data);

    } catch (error) {
        console.error('Error loading buckets : ', error);
    }

    return {
        'statusCode': 200,
        'body': JSON.stringify(data)
    }
}
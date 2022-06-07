import { ListObjectsCommand, S3Client } from "@aws-sdk/client-s3"


export default class S3Service {

    constructor(private s3Client: S3Client) { }

    listObjects = async (bucketName: string): Promise<any> => {

        const params = { Bucket: bucketName }
        const getObjectCommand = new ListObjectsCommand(params)
        const data = await this.s3Client.send(getObjectCommand)
        return data
    }
}


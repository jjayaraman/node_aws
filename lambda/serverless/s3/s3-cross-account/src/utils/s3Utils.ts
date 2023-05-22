import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'

const client = new S3Client({ region: 'eu-west-2' })

export const upload = async () => {
  const putObjectCommandInput: PutObjectCommandInput = {
    Body: 'hello world..',
    Bucket: 'jjays3crossbucket',
    Key: 'hello',
    Tagging: 'key1=value1&key2=value2',
  }

  const command = new PutObjectCommand(putObjectCommandInput)
  await client.send(command)
  console.log(`uploaded....`)
}

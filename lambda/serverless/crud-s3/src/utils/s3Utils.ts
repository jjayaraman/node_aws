import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import * as moment from 'moment';

const s3Client = new S3Client({});

export const s3Upload = async (bucketName: string, contents: string) => {
  console.log(`bucketName : ${bucketName}, file : ${contents}`);

  if (!bucketName || !contents) {
    throw new Error(`Invalid data supplied...`);
  }
  const time = moment().format('YYYYMMDDhhmmssSSS');
  const putObjectCommandInput: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: `fxrate_${time}`,
    Body: contents,
  };

  const putObjectCommand: PutObjectCommand = new PutObjectCommand(
    putObjectCommandInput
  );

  try {
    const data = await s3Client.send(putObjectCommand);
    console.log(`Data uploaded successfully`);
    return data;
  } catch (error) {
    console.error(error);
  }
};

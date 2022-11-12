import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import fs from 'fs';
import path from 'path';

const s3Client = new S3Client({});

export const s3Upload = async (bucketName: string, file: string) => {
  console.log(`bucketName : ${bucketName}, file : ${file}`);

  if (!bucketName || !file) {
    throw new Error(`Invalid data supplied.`);
  }

  const fileStream = fs.createReadStream(file);

  const putObjectCommandInput: PutObjectCommandInput = {
    Bucket: bucketName,
    Key: path.basename(file),
    Body: fileStream,
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

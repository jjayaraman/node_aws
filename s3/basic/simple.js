
import { DeleteObjectCommand, ListBucketsCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from '../utils/s3.js'


const listBuckets = async () => {
  try {
    const { Buckets } = await s3Client.send(new ListBucketsCommand({}));
    console.log(Buckets);
  } catch (error) {
    console.error('Error ::: ', error)
  }
}

const uploadFile = async () => {
  try {
    const command = {
      'Bucket': 'jayfirstbucket123',
      'Key': 'fromjs.txt',
      'Body': 'Hello world from Node JS'
    };
    const res = await s3Client.send(new PutObjectCommand(command));
    console.log(res);
  } catch (error) {
    console.error('Error ::: ', error)
  }
}

const deleteFile = async () => {
  try {
    const command = {
      'Bucket': 'jayfirstbucket123',
      'Key': 'fromjs.txt',
    };
    const res = await s3Client.send(new DeleteObjectCommand(command));
    console.log(res);
  } catch (error) {
    console.error('Error ::: ', error)
  }
}



export default { listBuckets, uploadFile, deleteFile };

// listBuckets();
// uploadFile();
deleteFile();
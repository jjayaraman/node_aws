import {
  CopyObjectCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3'

export const client = () => {
  return new S3Client({ region: 'eu-west-2' })
}

export const clientFromInput = (
  accessKey1: string,
  accessKey2: string,
  region?: string
) => {
  const config = {
    region: region || 'eu-west-2',
    credentials: {
      accessKeyId: accessKey1,
      secretAccessKey: accessKey2,
    },
    
  }
  return new S3Client(config)
}

export const upload = async (Bucket: string, Key: string, Body: any) => {
  const putObjectCommandInput: PutObjectCommandInput = {
    Body,
    Bucket,
    Key,
  }
  if (!Body || !Bucket || !Key) {
    throw new Error(
      `Invalid inputs supplied. Please supply all inputs ->  Bucket: ${Bucket}, Key: ${Key}, Body: ${Body}`
    )
  }
  const command = new PutObjectCommand(putObjectCommandInput)
  await client().send(command)
  console.log(`uploaded....`)
}

export const getBucketKeys = async (
  bucket: string,
  client: any
): Promise<Array<string>> => {
  let allKeys: Array<string> = []
  console.log(`getBucketKeys -> bucket: ${bucket}`)

  const command = new ListObjectsV2Command({
    Bucket: bucket,
  })

  try {
    let isTruncated = true

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command)
      const keys = Contents?.map((c: any) => c.Key) as Array<string>
      console.log(`keys: ${keys}`)

      if (keys && keys?.length > 0) {
        allKeys = allKeys.concat(keys)
      }

      // Check if there are next batch of contents above 1000
      isTruncated = IsTruncated as boolean
      command.input.ContinuationToken = NextContinuationToken
    }
    console.log(`allKeys : ${allKeys}`)
  } catch (err) {
    console.error(err)
  }
  return allKeys
}

export const copyBetweenBuckets = async (
  sourceBucket: string,
  sourceKey: string,
  destinationBucket: string,
  destinationKey: string
) => {
  const command = new CopyObjectCommand({
    CopySource: `${sourceBucket}/${sourceKey}`,
    Bucket: destinationBucket,
    Key: destinationKey,
  })

  try {
    const response = await client().send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

export const copyAllBetweenBuckets = async (
  sourceBucket: string,
  destinationBucket: string
): Promise<any> => {
  console.log(
    `copyAllBetweenBuckets -> sourceBucket: ${sourceBucket}, destinationBucket: ${destinationBucket}`
  )

  const sourceKeys = await getBucketKeys(sourceBucket, client())
  console.log(`sourceKeys: ${sourceKeys}`)

  for (const key of sourceKeys) {
    console.log(
      `copying key: ${key} from ${sourceBucket} to ${destinationBucket}`
    )
    const command = new CopyObjectCommand({
      CopySource: `${sourceBucket}/${key}`,
      Bucket: destinationBucket,
      Key: key,
    })

    try {
      const response = await client().send(command)
      console.log(`response: ${response}`)
    } catch (err) {
      console.error(`Error in s3Utils copyAllBetweenBuckets is: ${err}`)
      return err
    }
  }
  const resp = `Keys: ${sourceKeys} copied from ${sourceBucket} to ${destinationBucket} `
  return resp
}

/**
 * Copy all contents from the source bucket to destination bucket.
 * The source and destination buckets can be in two different accounts.
 *
 * @param sourceBucket
 * @param destinationBucket
 * @param sourceS3Client
 * @param destS3Client
 * @returns
 */
export const copyAllBetweenCrossBuckets = async (
  sourceBucket: string,
  destinationBucket: string,
  sourceS3Client: S3Client,
  destS3Client: S3Client
): Promise<any> => {
  console.log(
    `copyAllBetweenCrossBuckets -> sourceBucket: ${sourceBucket}, destinationBucket: ${destinationBucket}`
  )

  const sourceKeys = await getBucketKeys(sourceBucket, sourceS3Client)
  console.log(`sourceKeys: ${sourceKeys}`)

  for (const key of sourceKeys) {
    console.log(
      `copying key: ${key} from ${sourceBucket} to ${destinationBucket}`
    )
    const command = new CopyObjectCommand({
      CopySource: `${sourceBucket}/${key}`,
      Bucket: destinationBucket,
      Key: key,
    })

    try {
      const response = await destS3Client.send(command)
      console.log(`response: ${response}`)
    } catch (err) {
      console.error(`Error in s3Utils copyAllBetweenBuckets is: ${err}`)
      return err
    }
  }
  const resp = `Keys: ${sourceKeys} copied from ${sourceBucket} to ${destinationBucket} `
  return resp
}

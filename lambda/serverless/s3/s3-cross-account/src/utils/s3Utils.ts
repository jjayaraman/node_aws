import {
  CopyObjectCommand,
  ListObjectsV2Command,
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

export const getBucketKeys = async (bucket: string): Promise<Array<string>> => {
  let allKeys: Array<string> = []

  const command = new ListObjectsV2Command({
    Bucket: bucket,
  })

  try {
    let isTruncated = true

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } =
        await client.send(command)
      const keys = Contents?.map((c) => c.Key) as Array<string>
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
    const response = await client.send(command)
    console.log(response)
  } catch (err) {
    console.error(err)
  }
}

export const copyAllBetweenBuckets = async (
  sourceBucket: string,
  destinationBucket: string
) => {
  const sourceKeys = await getBucketKeys(sourceBucket)

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
      const response = await client.send(command)
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  }
}

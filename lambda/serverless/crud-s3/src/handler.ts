'use strict';

import { s3Upload } from './utils/s3Utils';

export const upload = async (event) => {
  console.log(`event : ${JSON.stringify(event)}`);

  const BUCKET_NAME = process.env.FX_S3_BUCKET_NAME as string;
  const contents = event.body;
  console.log(`bucket ${BUCKET_NAME}, contents: ${contents}`);

  const result = await s3Upload(BUCKET_NAME, contents);
  console.log(`result : ${JSON.stringify(result)}`);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};

'use strict';

import { s3Upload } from './utils/s3Utils';

export const upload = async (event) => {
  console.log(`event : ${JSON.stringify(event)}`);

  const BUCKET_NAME = process.env.FX_S3_BUCKET_NAME as string;
  const file = event.body.file;

  console.log(`bucket ${BUCKET_NAME}, file: ${file}`);

  const result = await s3Upload(BUCKET_NAME, file);
  console.log(`result : ${JSON.stringify(result)}`);

  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};
